import { motion } from "framer-motion";

interface Props {
  iconCode: string;
  description: string;
}

export default function AnimatedWeatherIcon({ iconCode, description }: Props) {
  const src = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;

  return (
    <motion.div
      key={iconCode}
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center"
    >
      <motion.img
        src={src}
        alt={description}
        className="w-28 h-28 drop-shadow-xl"
        animate={{
          y: [0, -6, 0], // soft bounce
          filter: [
            "drop-shadow(0 0 2px rgba(255,255,255,0.3))",
            "drop-shadow(0 0 12px rgba(255,255,255,0.8))",
            "drop-shadow(0 0 2px rgba(255,255,255,0.3))"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}
