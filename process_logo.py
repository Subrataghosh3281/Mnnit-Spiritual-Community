from PIL import Image
import numpy as np

src_path = r"C:\Users\USER\.gemini\antigravity\scratch\anahad-band-mnnit\public\images\anahad-logo.png"
img = Image.open(src_path).convert("RGBA")
w, h = img.size
print("Original size:", w, h)

# Let's inspect the bounding box of the circular/scalloped emblem
# The emblem has a dark outer scalloped border (#3d2621 approx)
# Outside of the scalloped border is a pale yellowish/tan background (#e0cca4 approx)
data = np.array(img)

# Let's find the center and radius of the scalloped circle
# Center is roughly (w/2, h/2)
cx, cy = w / 2, h / 2

# Let's make an alpha mask where everything outside the scalloped border is transparent
# The scalloped border is dark brown. Let's find where the outer background starts.
# Outside the scalloped border, colors are light tan (R > 180, G > 160, B > 130) or near the corners.
# Let's sample corners:
corners = [data[0, 0], data[0, w-1], data[h-1, 0], data[h-1, w-1]]
print("Corner colors:", corners)

# We can create a high-quality cutout:
# Let's save the exact original as anahad-logo-original.png
img.save(r"C:\Users\USER\.gemini\antigravity\scratch\anahad-band-mnnit\public\images\anahad-logo-original.png")

# Now let's create a transparent version where the outer tan background outside the badge is made transparent:
# The badge is roughly circular centered at cx, cy with radius ~ 118 pixels
# Let's flood-fill or use color threshold from the 4 corners:
from collections import deque

mask = np.zeros((h, w), dtype=bool) # True = background to remove
visited = np.zeros((h, w), dtype=bool)

# Target corner color: around [215, 195, 160]
# Flood fill from all 4 borders:
q = deque()
for x in range(w):
    q.append((0, x))
    q.append((h-1, x))
for y in range(h):
    q.append((y, 0))
    q.append((y, w-1))

while q:
    y, x = q.popleft()
    if visited[y, x]:
        continue
    visited[y, x] = True
    
    r, g, b, a = data[y, x]
    # Check if pixel is background (light tan/cream outside the dark scalloped border)
    # The scalloped border is dark: r < 90, g < 70, b < 70
    is_dark_border = (r < 100 and g < 80 and b < 80)
    
    if not is_dark_border:
        mask[y, x] = True
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                q.append((ny, nx))

# Apply transparency to background
clean_data = data.copy()
clean_data[mask, 3] = 0

clean_img = Image.fromarray(clean_data)
# Crop to bounding box of non-transparent pixels
bbox = clean_img.getbbox()
if bbox:
    clean_img = clean_img.crop(bbox)

clean_img.save(r"C:\Users\USER\.gemini\antigravity\scratch\anahad-band-mnnit\public\images\anahad-logo-badge.png")
# Also save as main logo
clean_img.save(r"C:\Users\USER\.gemini\antigravity\scratch\anahad-band-mnnit\public\images\anahad-logo.png")
print("Clean transparent badge saved! New size:", clean_img.size)
