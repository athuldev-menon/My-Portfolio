import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // Step 1: Use Motion Values for smoother tracking performance
    const cursorX = useMotionValue(-100); // Start off-screen
    const cursorY = useMotionValue(-100);

    // Step 2: Add Spring physics to the tracking (gives it the subtle "lag")
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Adjust coordinates to center the cursor (circle is 32px w/h, subtract 16)
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);

            // Advanced hover detection for *any* clickable element
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a, button, input, select, textarea');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [cursorX, cursorY]);

    // Framer Motion Animation Variants for the Parent Circle
    const circleVariants = {
        default: {
            scale: 1,
            borderColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white ring
        },
        hover: {
            scale: 1.5, // Circle expands on hover
            borderColor: "rgba(255, 255, 255, 1)", // Full white ring
            backdropFilter: "blur(2px)", // Subtle blur effect inside the ring
        }
    };

    // Animation Variants for the Inner Dot
    const dotVariants = {
        default: {
            scale: 1,
            backgroundColor: "#B600A8", // Your primary purple/magenta theme color
        },
        hover: {
            scale: 0.5, // Dot shrinks on hover to look precise
            backgroundColor: "#ffffff", // Dot turns white on hover
        }
    };

    return (
        <motion.div
            // Standard Tailwind styles for the outer circle
            // 'flex items-center justify-center' keeps the dot perfectly centered
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center pointer-events-none z-[9999]"
            style={{
                x: smoothX,
                y: smoothY,
            }}
            variants={circleVariants}
            animate={isHovering ? "hover" : "default"}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
            {/* --- THE DOT INSIDE --- */}
            <motion.div
                // Tailwind styles for the inner solid dot (w-2/h-2 is about 8px)
                className="w-2 h-2 rounded-full"
                variants={dotVariants}
                animate={isHovering ? "hover" : "default"}
                transition={{ type: "tween", duration: 0.2 }} // Fast linear fade
            />
            {/* ------------------------- */}
        </motion.div>
    );
}