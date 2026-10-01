from PIL import Image

im = Image.open('scratch/scratch_dm_1.jpg')
w, h = im.size
crop = im.crop((int(0.20 * w), int(0.02 * h), int(0.48 * w), int(0.35 * h)))
crop.save('scratch/entrance_visual.png')
print("Saved entrance_visual.png")
