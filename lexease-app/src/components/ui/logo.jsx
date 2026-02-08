import React from 'react';

export function Logo({ className = "w-10 h-10" }) {
    return (
        <svg
            viewBox="0 0 400 400"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Main Heart Shape */}
            <path
                d="M200 350C200 350 350 250 350 150C350 80 280 50 230 100C220 110 200 130 200 130C200 130 180 110 170 100C120 50 50 80 50 150C50 250 200 350 200 350Z"
                fill="#6366F1"
            />

            {/* Smiley Face */}
            <circle cx="150" cy="170" r="10" fill="white" />
            <circle cx="250" cy="170" r="10" fill="white" />
            <path
                d="M150 210C150 210 200 250 250 210"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
            />

            {/* Top Hearts */}
            <path
                d="M200 60C200 60 215 50 215 40C215 33 208 30 203 35C202 36 200 38 200 38C200 38 198 36 197 35C192 30 185 33 185 40C185 50 200 60 200 60Z"
                fill="#6366F1"
            />
            <path
                d="M200 30C200 30 208 25 208 20C208 16 204 15 201 17C201 18 200 19 200 19C200 19 199 18 199 17C196 15 192 16 192 20C192 25 200 30 200 30Z"
                fill="#6366F1"
                opacity="0.8"
            />
        </svg>
    );
}
