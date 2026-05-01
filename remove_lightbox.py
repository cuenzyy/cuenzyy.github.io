import re

# Read the file
with open('gallery.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove all data-lightbox-open attributes
# This regex matches the pattern: data-lightbox-open="{...}"
content = re.sub(r' data-lightbox-open="[^"]*"', '', content)

# Write back to file
with open('gallery.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully removed all data-lightbox-open attributes from gallery.html")
