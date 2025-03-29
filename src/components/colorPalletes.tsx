'use client'

export default function ColorPalletes() {
  const colors = [
    '#FFFFFF', // White
    '#000000', // Black
    '#808080', // Gray
    '#D3D3D3', // Light Gray
    '#C0C0C0', // Silver
    '#F5F5F5', // Off White
    '#007BFF', // Blue
    '#0056B3', // Dark Blue
    '#87CEEB', // Sky Blue
    '#1E90FF', // Dodger Blue
    '#FF0000', // Red
    '#DC143C', // Crimson
    '#FF6347', // Tomato
    '#FF4500', // Orange Red
    '#FFA500', // Orange
    '#FFD700', // Gold
    '#FFFF00', // Yellow
    '#9ACD32', // Yellow Green
    '#28A745', // Green
    '#008000', // Dark Green
    '#20B2AA', // Light Sea Green
    '#2E8B57', // Sea Green
    '#00FFFF', // Cyan
    '#4682B4', // Steel Blue
    '#6A5ACD', // Slate Blue
    '#6F42C1', // Purple
    '#800080', // Dark Purple
    '#FF69B4', // Hot Pink
    '#E91E63', // Pink
    '#FFC0CB', // Light Pink
    '#FFB6C1', // Baby Pink
    '#20C997', // Teal
    '#B0E0E6', // Powder Blue
    '#A52A2A', // Brown
    '#8B4513', // Saddle Brown
    '#708090', // Slate Gray
  ]

  return (
    <>
      {colors.map((color) => (
        <div
          key={color}
          className='h-16 w-16 rounded border shadow-md transition-transform hover:scale-105'
          style={{ backgroundColor: color }}
          title={color}
        ></div>
      ))}
    </>
  )
}
