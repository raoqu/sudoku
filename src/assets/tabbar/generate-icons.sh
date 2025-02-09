#!/bin/bash

# Home icon
cat > home.svg << 'EOF'
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 22V12h6v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
EOF

# History icon
cat > history.svg << 'EOF'
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
  <path d="M12 6v6l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>
EOF

# Rank icon
cat > rank.svg << 'EOF'
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 21h14M6 18h12M8 15h8M10 3l4 4m0-4l-4 4m2-4v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
EOF

# Profile icon
cat > profile.svg << 'EOF'
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-width="2"/>
</svg>
EOF

# Convert SVGs to PNGs
for icon in home history rank profile; do
  # Normal version (gray)
  sed 's/currentColor/#666666/' $icon.svg > ${icon}-gray.svg
  rsvg-convert -w 48 -h 48 ${icon}-gray.svg > $icon.png
  
  # Active version (blue)
  sed 's/currentColor/#667eea/' $icon.svg > ${icon}-active.svg
  rsvg-convert -w 48 -h 48 ${icon}-active.svg > ${icon}-active.png
  
  # Clean up SVGs
  rm ${icon}.svg ${icon}-gray.svg ${icon}-active.svg
done
