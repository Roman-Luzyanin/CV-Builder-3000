import { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ExpandingSection({ children }) {
	const ref = useRef(null);
	const [height, setHeight] = useState(0);

	useLayoutEffect(() => {
		if (ref.current) {
			setHeight(ref.current.scrollHeight);
		}
	}, [children]); 

	return (
		<motion.div
			initial={{ height: 0, opacity: 0 }}
			animate={{ height, opacity: 1 }}
			exit={{ height: 0, opacity: 0 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			style={{ overflow: "hidden" }}
		>
			<div ref={ref}>{children}</div>
		</motion.div>
	);
}