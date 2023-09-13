"use client";
import { toast } from "@/hooks/use-toast";
import React, { useState } from "react";

function HeartAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  const handleHeartClick = () => {
    setIsAnimating(!isAnimating);

    setIsFavorite(!isFavorite);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);

    if (isFavorite) {
      toast({
        description: `Added to favorites`,
        variant: "favorite",
      });
      setBackgroundColor("#E2264D");
    } else {
      toast({
        description: `Removed from favorites`,
      });
      setBackgroundColor("");
    }
  };

  return (
    <div
      className={`heart ${isAnimating ? "is_animating" : ""}`}
      onClick={handleHeartClick}
      onAnimationEnd={handleAnimationEnd}
      style={{ backgroundColor }}
    />
  );
}

export default HeartAnimation;
