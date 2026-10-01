from PIL import Image, ImageDraw, ImageFont

# RFC
im_rfc = Image.open('scratch_rfc.jpg').crop((0, 0, 1008, 672))
draw_rfc = ImageDraw.Draw(im_rfc)
w, h = im_rfc.size
rfc_bosses = [
    ("Oggleflint", 0.885, 0.585),
    ("Taragaman the Hungerer", 0.435, 0.515),
    ("Jergosh the Invoker", 0.350, 0.825),
    ("Bazzalan", 0.485, 0.885),
]
# Let's test with original coords vs 768->672 scaled coords
for name, nx, ny in rfc_bosses:
    # If nx, ny were for 1024x768:
    px = int(nx * 1024)
    py = int(ny * 768)
    draw_rfc.ellipse((px-8, py-8, px+8, py+8), fill=(255, 0, 0), outline=(255, 255, 0))
    draw_rfc.text((px+10, py-5), name, fill=(255, 255, 255))
im_rfc.save('scratch_rfc_test_raw.jpg')
print("Saved scratch_rfc_test_raw.jpg")
