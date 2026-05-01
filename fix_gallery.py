import re

# Read the file
with open('gallery.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find the broken section - it should be from the old T-Shirt Designs lightweight carousel to just before the lightbox
pattern = r'<div class="mt-10 reveal">\s*<div class="mt-8">\s*<h4 class="text-lg font-semibold tracking-tight">T-Shirt Designs</h4>.*?</div>\s*</div>\s*</div>\s*<div class="border-b border-slate-200 my-12"></div>\s*<div class="mx-auto max-w-6xl px-4">'

replacement = '''<div class="mx-auto max-w-6xl px-4 py-10">
        <div class="mt-8 reveal" id="subsection-tshirt-designs">
          <h4 class="text-lg font-semibold tracking-tight">T-Shirt Designs (Reality Racing)</h4>
          <p class="mt-2 text-slate-500">Streetwear graphic designs for Reality Racing and custom apparel.</p>
          <div class="mt-8 reveal">
            <div class="carousel-container rounded-3xl border border-slate-200 bg-slate-100/30 p-4 md:p-6">
              <div class="grid gap-4 md:gap-6 lg:grid-cols-2">
                <div>
                  <div class="carousel-viewer relative overflow-hidden rounded-2xl border border-slate-200 bg-white/50 h-80">
                    <div class="carousel-slides">
                      <img class="carousel-slide w-full h-full object-cover" src="images/graphic_samples/Others/REALITY-RACING.CO/BLACK/1.png" alt="Reality Racing Black 1" />
                      <img class="carousel-slide w-full h-full object-cover hidden" src="images/graphic_samples/Others/REALITY-RACING.CO/BLACK/3.png" alt="Reality Racing Black 3" />
                      <img class="carousel-slide w-full h-full object-cover hidden" src="images/graphic_samples/Others/REALITY-RACING.CO/BLACK/5.png" alt="Reality Racing Black 5" />
                      <img class="carousel-slide w-full h-full object-cover hidden" src="images/graphic_samples/Others/REALITY-RACING.CO/WHITE/2.png" alt="Reality Racing White 2" />
                      <img class="carousel-slide w-full h-full object-cover hidden" src="images/graphic_samples/Others/REALITY-RACING.CO/WHITE/4.png" alt="Reality Racing White 4" />
                      <img class="carousel-slide w-full h-full object-cover hidden" src="images/graphic_samples/Others/REALITY-RACING.CO/WHITE/6.png" alt="Reality Racing White 6" />
                    </div>
                    <button class="carousel-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                      </svg>
                    </button>
                    <button class="carousel-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                  <div class="mt-3 text-center text-sm text-slate-500">
                    <span class="carousel-current">1</span> / <span class="carousel-total">6</span>
                  </div>
                </div>
                <div class="carousel-descriptions">
                  <div class="carousel-description"><h3 class="text-lg font-semibold">Reality Racing Streetwear Collection</h3><p class="mt-2 text-slate-700"><span class="text-slate-500">Context:</span> Streetwear brand required distinctive graphic designs for their racing-inspired apparel line, combining bold visual elements with brand identity.</p><p class="mt-2 text-slate-700"><span class="text-slate-500">My role:</span> Designed custom t-shirt graphics featuring racing themes, lifestyle aesthetics, and bold typography available in both black and white colorways for versatile brand application.</p><p class="mt-2 text-slate-700"><span class="text-slate-500">Tools used:</span> Photoshop and Illustrator</p><p class="mt-2 text-slate-700"><span class="text-slate-500">Result:</span> Created memorable streetwear designs that resonated with target audience, strengthened brand identity, and drove apparel sales and brand recognition.</p><div class="mt-4 flex flex-wrap gap-2"><span class="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs text-slate-900 dark:text-slate-200">Streetwear</span><span class="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs text-slate-900 dark:text-slate-200">Graphic Design</span></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-b border-slate-200 my-12"></div>

      <div class="mx-auto max-w-6xl px-4">'''

# Replace
content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back
with open('gallery.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Gallery.html has been updated successfully!")
