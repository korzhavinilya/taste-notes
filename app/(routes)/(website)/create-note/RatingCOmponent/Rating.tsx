'use client';

import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

interface RatingProps {
  defaultValue?: number;
  totalStars?: number;
  className?: string;
  disabled?: boolean;
}

export default function Rating({
  defaultValue = 0,
  totalStars = 5,
  className,
  disabled
}: RatingProps) {
  const [rating, setRating] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className={className ?? ''}>
      <label className="font-medium">Region</label>

      <span className="flex">
        {[...Array(totalStars)].map((star, index) => {
          const currentRating = index + 1;
          const isSelected = currentRating <= (hover || rating);

          let Icon: IconType;
          if (isSelected) {
            Icon = IoMdStar;
          } else {
            Icon = IoMdStarOutline;
          }

          return (
            <React.Fragment key={index}>
              <Icon
                className="h-5 w-5"
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(currentRating)}
              />
            </React.Fragment>
          );
        })}
      </span>

      <input
        name="rating"
        className="hidden"
        type="text"
        value={rating}
        readOnly
      />
    </div>
  );
}
