#!/usr/bin/env python3
"""
Extract Sunday Routine interviews from HTML files and convert to markdown.
"""
import re
import os
from html import unescape
from bs4 import BeautifulSoup
from pathlib import Path

# Category mapping from index.html
CATEGORIES = {
    'jk-keller': 'artists',
    'jonathon-linaberry': 'artists',
    'erin-kanagy-loux': 'foodies-makers',
    'hannah-kirshner': 'foodies-makers',
    'peter-nguyen': 'foodies-makers',
    'rachel-lauginiger': 'foodies-makers',
    'adina-grigore': 'entrepreneurs',
    'alec-bemis': 'entrepreneurs',
    'erin-przekop-tom-critchlow': 'entrepreneurs',
    'jeff-johnson': 'entrepreneurs',
    'jeff-laub': 'entrepreneurs',
    'jeffrey-johnson': 'entrepreneurs',
    'jim-and-julie-babb': 'entrepreneurs',
    'john-v-willshire': 'entrepreneurs',
    'laura-burhenn': 'entrepreneurs',
    'lauren-cerand': 'entrepreneurs',
    'taylor-welden': 'entrepreneurs',
    'tom-mylan': 'entrepreneurs',
    'atossa-abrahamian': 'writers',
    'daniel-roberts': 'writers',
    'emily-gould': 'writers',
    'molly-young': 'writers',
    'tao-lin': 'writers',
}

# Profession and location from index.html
METADATA = {
    'jk-keller': {'profession': 'artist', 'location': 'NYC'},
    'jonathon-linaberry': {'profession': 'singer/songwriter The Bones of J.R. Jones', 'location': 'NYC'},
    'erin-kanagy-loux': {'profession': 'Pastry Chef at the Wythe Hotel', 'location': 'NYC'},
    'hannah-kirshner': {'profession': 'founder and editor of Sweets & Bitters, freelance recipe developer', 'location': 'Brooklyn'},
    'peter-nguyen': {'profession': 'blogger, designer, leather jacket maker', 'location': 'LA'},
    'rachel-lauginiger': {'profession': 'private chef', 'location': 'Brooklyn'},
    'adina-grigore': {'profession': 'founder of SW Basics of Brooklyn', 'location': 'Manhattan'},
    'alec-bemis': {'profession': 'Brassland Records', 'location': 'New York'},
    'erin-przekop-tom-critchlow': {'profession': 'Fiercely Curious & Fiercely Made', 'location': 'Brooklyn'},
    'jeff-johnson': {'profession': 'art restoration and designer', 'location': 'LA'},
    'jeff-laub': {'profession': '', 'location': 'LA'},
    'jeffrey-johnson': {'profession': '', 'location': 'LA'},
    'jim-and-julie-babb': {'profession': 'Tech Entrepreneurs (AwkwardHug.com)', 'location': 'LA'},
    'john-v-willshire': {'profession': 'Smithery.co & Artefact Cards', 'location': 'LA'},
    'laura-burhenn': {'profession': 'frontwoman of The Mynabirds', 'location': 'Los Angeles'},
    'lauren-cerand': {'profession': 'independent literary publicist', 'location': 'Brooklyn'},
    'taylor-welden': {'profession': 'Industrial Designer, Facial Hair Enthusiast', 'location': 'LA'},
    'tom-mylan': {'profession': '', 'location': 'Brooklyn'},
    'atossa-abrahamian': {'profession': 'journalist and reporter at Al Jazeera', 'location': 'NYC'},
    'daniel-roberts': {'profession': 'writer at Fortune Magazine', 'location': 'Brooklyn'},
    'emily-gould': {'profession': 'author of And The Heart Says Whatever', 'location': 'Brooklyn'},
    'molly-young': {'profession': 'creative at Warby Parker', 'location': 'Brooklyn'},
    'tao-lin': {'profession': 'founder of MuuMuu House Publishing & author', 'location': 'LA'},
}

def extract_content(html_file):
    """Extract interview content from HTML file."""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    
    # Extract title
    title_elem = soup.find('h1', class_='entry-title')
    if title_elem:
        title = title_elem.get_text(strip=True)
    else:
        # Fallback to filename
        title = Path(html_file).stem.replace('-', ' ').title()
    
    # Extract date
    date_elem = soup.find('time', class_='published')
    date = None
    if date_elem and date_elem.get('datetime'):
        date = date_elem.get('datetime')
    
    # Extract content from sqs-html-content div
    content_div = soup.find('div', class_='sqs-html-content')
    if not content_div:
        return None
    
    # Get the HTML content
    html_content = str(content_div)
    
    # Convert HTML to markdown-like format
    # Remove the outer div
    html_content = re.sub(r'<div[^>]*class="sqs-html-content"[^>]*>', '', html_content)
    html_content = html_content.replace('</div>', '', 1)
    
    # Clean up HTML entities
    html_content = unescape(html_content)
    
    # Convert common HTML tags to markdown
    html_content = re.sub(r'<h3><strong>(.*?)</strong></h3>', r'**\1**\n\n', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<h2>(.*?)</h2>', r'\n\n## \1\n\n', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<p>(.*?)</p>', r'\1\n\n', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<strong>(.*?)</strong>', r'**\1**', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<em>(.*?)</em>', r'*\1*', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<a href="([^"]*)"[^>]*>(.*?)</a>', r'[\2](\1)', html_content, flags=re.DOTALL)
    
    # Clean up extra whitespace
    html_content = re.sub(r'\n{3,}', '\n\n', html_content)
    html_content = html_content.strip()
    
    return {
        'title': title,
        'date': date,
        'content': html_content
    }

def create_markdown_file(slug, data):
    """Create markdown file from extracted data."""
    category = CATEGORIES.get(slug, 'other')
    metadata = METADATA.get(slug, {})
    
    front_matter = f"""---
layout: sunday-routine-interview
title: "{data['title']}"
category: {category}
"""
    
    if metadata.get('profession'):
        front_matter += f"profession: \"{metadata['profession']}\"\n"
    if metadata.get('location'):
        front_matter += f"location: \"{metadata['location']}\"\n"
    if data.get('date'):
        front_matter += f"date: {data['date']}\n"
    
    front_matter += "---\n\n"
    
    content = front_matter + data['content']
    
    output_file = Path(f"_sunday-routine/{slug}.md")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Created {output_file}")

def main():
    """Main extraction function."""
    base_dir = Path('projects/sunday-routine')
    
    for html_file in sorted(base_dir.glob('*.html')):
        if html_file.name in ['index.html', 'blog.html', 'categories.html', 'contact.html', 'subscribe.html']:
            continue
        
        slug = html_file.stem
        print(f"Processing {html_file.name}...")
        
        data = extract_content(html_file)
        if data:
            create_markdown_file(slug, data)
        else:
            print(f"  Warning: Could not extract content from {html_file.name}")

if __name__ == '__main__':
    main()



