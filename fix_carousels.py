#!/usr/bin/env python3
import re

def fix_carousel_descriptions(html_content):
    """
    Fix all carousels to have matching carousel-description divs for each slide
    """
    
    # Pattern to find carousel containers with their slides
    pattern = r'<div class="carousel-container[^"]*"[^>]*>\s*<div class="grid[^>]*>\s*<div>\s*<div class="carousel-viewer[^>]*>\s*<div class="carousel-slides">(.*?)</div>'
    
    def count_slides(matches):
        slides_html = matches.group(1)
        slide_count = slides_html.count('class="carousel-slide')
        return slide_count
    
    # Find all carousel containers and fix them
    def fix_carousel(match):
        full_match = match.group(0)
        slides_section = match.group(1)
        
        # Count slides
        slide_count = slides_section.count('class="carousel-slide')
        
        # If we find descriptions section, we need to ensure it has enough divs
        # This is complex because we need to find the corresponding descriptions section
        
        return full_match
    
    # Simplified approach: For Meta Ads subsections, manually fix each one
    # Day One - 5 slides
    day_one_fix = fix_subsection_descriptions(html_content, 'subsection-day-one', 5, 'Day One')
    
    # Fallen Yet Not Forgotten - 4 slides
    fallen_fix = fix_subsection_descriptions(day_one_fix, 'subsection-fallen', 4, 'Fallen Yet Not Forgotten')
    
    # Findigs - 5 slides
    findigs_fix = fix_subsection_descriptions(fallen_fix, 'subsection-findigs', 5, 'Findigs')
    
    # Gnarly Pets - 5 slides
    gnarly_fix = fix_subsection_descriptions(findigs_fix, 'subsection-gnarly-pets', 5, 'Gnarly Pets')
    
    # Ocean Wash - 5 slides
    ocean_fix = fix_subsection_descriptions(gnarly_fix, 'subsection-ocean-wash', 5, 'Ocean Wash')
    
    # MD - 4 slides
    md_fix = fix_subsection_descriptions(ocean_fix, 'subsection-md', 4, 'MD')
    
    # Scope Health - 4 slides
    scope_fix = fix_subsection_descriptions(md_fix, 'subsection-scope-health', 4, 'Scope Health')
    
    # Shankara - 4 slides
    shankara_fix = fix_subsection_descriptions(scope_fix, 'subsection-shankara', 4, 'Shankara')
    
    # Sri Sri Tattva - 4 slides
    sri_sri_fix = fix_subsection_descriptions(shankara_fix, 'subsection-sri-sri', 4, 'Sri Sri Tattva')
    
    # T-Shirt Designs - 6 slides
    tshirt_fix = fix_subsection_descriptions(sri_sri_fix, 'subsection-tshirt-designs', 6, 'Reality Racing Streetwear Collection')
    
    return tshirt_fix

def fix_subsection_descriptions(html_content, subsection_id, num_slides, title):
    """
    Fix a specific subsection to have the correct number of descriptions
    """
    
    # Find the carousel-descriptions section for this subsection
    # Pattern: find carousel-descriptions div and replace its contents with proper number of divs
    
    pattern = f'(id="{subsection_id}".*?<div class="carousel-descriptions">)(.*?)(</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>)'
    
    def replacer(match):
        prefix = match.group(1)
        old_descriptions = match.group(2)
        suffix = match.group(3)
        
        # Extract the description content from the existing description
        desc_pattern = r'<div class="carousel-description[^"]*">(.+?)</div>'
        desc_match = re.search(desc_pattern, old_descriptions, re.DOTALL)
        
        if desc_match:
            description_content = desc_match.group(1)
        else:
            description_content = f'<h3 class="text-lg font-semibold">{title}</h3><p class="mt-2 text-slate-700">Design showcase and project details.</p>'
        
        # Create descriptions with hidden class for all but first
        new_descriptions = f'\n                    <div class="carousel-description">{description_content}</div>'
        
        for i in range(1, num_slides):
            new_descriptions += f'\n                    <div class="carousel-description hidden">{description_content}</div>'
        
        new_descriptions += '\n                '
        
        return f'{prefix}{new_descriptions}{suffix}'
    
    return re.sub(pattern, replacer, html_content, flags=re.DOTALL)

# Read the file
with open('gallery.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix all carousels
fixed_content = fix_carousel_descriptions(content)

# Write back
with open('gallery.html', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("✓ All carousels have been fixed with proper description matching!")
