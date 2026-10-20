import collections
import collections.abc
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor

def create_presentation():
    prs = Presentation()
    
    # Define some theme colors to match the cinematic noir-gold style
    bg_color = RGBColor(6, 6, 12)  # Noir deep background
    text_color = RGBColor(232, 228, 220)  # Ivory
    accent_color = RGBColor(201, 168, 76)  # Gold
    
    def apply_formatting(slide):
        # We try to apply a dark theme formatting by manipulating shapes
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = bg_color
        
        for shape in slide.shapes:
            if not shape.has_text_frame:
                continue
            for paragraph in shape.text_frame.paragraphs:
                for run in paragraph.runs:
                    run.font.color.rgb = text_color
                    # First paragraph in a shape might be a title
                    if shape == slide.shapes[0]:
                        run.font.color.rgb = accent_color

    # Slide 1: Title
    title_slide_layout = prs.slide_layouts[0]
    slide = prs.slides.add_slide(title_slide_layout)
    title = slide.shapes.title
    subtitle = slide.placeholders[1]
    title.text = "The Void's Resonance"
    subtitle.text = "Project Analysis & Proposed Feature Expansions\nA Cinematic Scroll Experience"
    apply_formatting(slide)
    
    # Slide 2: Project Analysis - Overview
    bullet_slide_layout = prs.slide_layouts[1]
    slide = prs.slides.add_slide(bullet_slide_layout)
    title = slide.shapes.title
    title.text = "Project Analysis: Current State"
    body = slide.placeholders[1]
    tf = body.text_frame
    tf.text = "Cinematic Noir-Gold Aesthetic"
    
    p = tf.add_paragraph()
    p.text = "Responsive, high-contrast design using custom properties (Gold, Ivory, Crimson, Deep Void)."
    p.level = 1
    
    p = tf.add_paragraph()
    p.text = "Scrollytelling & GSAP Integration"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "Utilizes ScrollTrigger to pin scenes and animate content sequentially (7 distinct scenes)."
    p.level = 1
    
    p = tf.add_paragraph()
    p.text = "Custom Visual Effects"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "Particle canvas field, CSS-based film grain, and custom cursor blending."
    p.level = 1
    apply_formatting(slide)
    
    # Slide 3: Expanding the Experience - Core Vision
    slide = prs.slides.add_slide(bullet_slide_layout)
    title = slide.shapes.title
    title.text = "Enhancement Strategy"
    body = slide.placeholders[1]
    tf = body.text_frame
    tf.text = "The goal is to elevate 'The Void's Resonance' from a visual scroll experience to a fully immersive, multi-sensory web environment."
    p = tf.add_paragraph()
    p.text = "We propose adding features across three pillars: Audio, WebGL (3D), and Interactivity."
    p.level = 1
    apply_formatting(slide)
    
    # Slide 4: Proposed Feature - Audio Soundscapes
    slide = prs.slides.add_slide(bullet_slide_layout)
    title = slide.shapes.title
    title.text = "Feature 1: Ambient Audio & Soundscapes"
    body = slide.placeholders[1]
    tf = body.text_frame
    tf.text = "Dynamic Ambient Soundtrack"
    p = tf.add_paragraph()
    p.text = "Continuous, evolving low-frequency drone that shifts pitch/tone as the user scrolls."
    p.level = 1
    
    p = tf.add_paragraph()
    p.text = "Scroll-Triggered Sound Effects (SFX)"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "Chimes, subtle thumps, or 'glass shatter' sounds tied to GSAP ScrollTrigger events (e.g., 'The Fracture')."
    p.level = 1
    apply_formatting(slide)
    
    # Slide 5: Proposed Feature - WebGL & 3D Objects
    slide = prs.slides.add_slide(bullet_slide_layout)
    title = slide.shapes.title
    title.text = "Feature 2: Three.js Integration"
    body = slide.placeholders[1]
    tf = body.text_frame
    tf.text = "3D Geometric Shards"
    p = tf.add_paragraph()
    p.text = "Replace 2D CSS shards in 'The Drift' with rotating, 3D refractive glass shards."
    p.level = 1
    
    p = tf.add_paragraph()
    p.text = "The Orb Evolution"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "Upgrade the CSS gradient Orb into a volumetric, glowing WebGL sphere with particle emissions."
    p.level = 1
    apply_formatting(slide)
    
    # Slide 6: Proposed Feature - Advanced Interactivity
    slide = prs.slides.add_slide(bullet_slide_layout)
    title = slide.shapes.title
    title.text = "Feature 3: Generative Interactivity"
    body = slide.placeholders[1]
    tf = body.text_frame
    tf.text = "Cursor Ripple Effects"
    p = tf.add_paragraph()
    p.text = "Mouse movement pushes apart background canvas particles (magnetic repulsion)."
    p.level = 1
    
    p = tf.add_paragraph()
    p.text = "Dynamic Typographic Distortion"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "Hovering over scene titles causes the text to slightly warp or glitch, emphasizing the 'resonance' theme."
    p.level = 1
    apply_formatting(slide)
    
    # Slide 7: Proposed Feature - Performance & Accessibility
    slide = prs.slides.add_slide(bullet_slide_layout)
    title = slide.shapes.title
    title.text = "Feature 4: Optimization & Accessibility"
    body = slide.placeholders[1]
    tf = body.text_frame
    tf.text = "Performance Optimization"
    p = tf.add_paragraph()
    p.text = "Implement off-screen canvas rendering for the particle system to ensure 60fps on mobile."
    p.level = 1
    
    p = tf.add_paragraph()
    p.text = "Reduced Motion Preference"
    p.level = 0
    p = tf.add_paragraph()
    p.text = "Detect 'prefers-reduced-motion' and disable heavy GSAP effects or parallax, offering a clean, text-based fallback."
    p.level = 1
    apply_formatting(slide)
    
    # Save the presentation
    output_path = r"c:\Users\Shubhankar Kambe\Desktop\Antigravity project\The_Voids_Resonance_Analysis.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    create_presentation()
