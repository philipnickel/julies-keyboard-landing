// initialization

const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")



function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    if (isHeaderCollapsed) {
        // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
        collapseHeaderItems.classList.add("opacity-100",)
        collapseHeaderItems.style.width = "60vw"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""

    } else {
        isHeaderCollapsed = true
    }
}

window.addEventListener("resize", responsive)


/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)


// Set initial state for reveal animations
gsap.set(".reveal-up", {
    opacity: 0,
    y: 50,
})

// FAQ accordion functionality (if it exists)
const faqAccordion = document.querySelectorAll('.faq-accordion')

if (faqAccordion.length > 0) {
    faqAccordion.forEach(function (btn) {
        btn.addEventListener('click', function () {
            this.classList.toggle('active')

            // Toggle 'rotate' class to rotate the arrow
            let content = this.nextElementSibling

            if (content.style.maxHeight === '200px') {
                content.style.maxHeight = '0px'
                content.style.padding = '0px 18px'
            } else {
                content.style.maxHeight = '200px'
                content.style.padding = '20px 18px'
            }
        })
    })
}




// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section")

sections.forEach((sec) => {
    const revealElements = sec.querySelectorAll(".reveal-up")

    // Only create animations if elements exist
    if (revealElements.length > 0) {
        gsap.timeline({
            scrollTrigger: {
                trigger: sec,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse",
                // markers: false,
            }
        })
        .to(revealElements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        })
    }
})

// ------------- card hover animations ---------------

const cards = gsap.utils.toArray("a[class*='tw-cursor-pointer']")

cards.forEach(card => {
    // Set initial state
    gsap.set(card, { scale: 1 })

    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        })
    })

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        })
    })
})
