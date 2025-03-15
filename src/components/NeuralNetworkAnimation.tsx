import React, { useState, useRef, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

interface NeuralNetworkAnimationProps {
  height?: string;
}

const MotionBox = motion(Box);

const NeuralNetworkAnimation: React.FC<NeuralNetworkAnimationProps> = ({ 
  height = "400px" 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Set up scroll-based animation with reset
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      // Check if component is in view
      const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isInView) {
        const scrollProgress = 1 - (rect.top / window.innerHeight);
        setIsScrolling(true);
        
        // Apply rotation only during scroll
        controls.start({
          rotateZ: scrollProgress * 5,
          scale: 1 + scrollProgress * 0.03,
        });
        
        // Clear any existing timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        
        // Set timeout to reset rotation after scrolling stops
        scrollTimeout.current = setTimeout(() => {
          setIsScrolling(false);
          controls.start({
            rotateZ: 0,
            scale: 1,
            transition: { duration: 0.8 }
          });
        }, 200);
      } else {
        // Reset when out of view
        controls.start({
          rotateZ: 0,
          scale: 1,
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial position
    controls.start({
      rotateZ: 0,
      scale: 1,
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [controls]);
  
  // For complex animation patterns
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [pulseNodes, setPulseNodes] = useState<{[key: string]: boolean}>({});
  
  // Complex node activation pattern
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        const randomNode = Math.floor(Math.random() * 15); // Total nodes across layers
        setActiveNodes(prev => {
          const newActive = [...prev, randomNode];
          if (newActive.length > 3) {
            return newActive.slice(1);
          }
          return newActive;
        });
        
        setTimeout(() => {
          setActiveNodes(prev => prev.filter(node => node !== randomNode));
        }, 2000);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isHovered]);
  
  // Data pulse effect along paths
  useEffect(() => {
    const interval = setInterval(() => {
      // Create a random path through the network
      const startLayer = Math.floor(Math.random() * 4); // 0-3
      const startNode = Math.floor(Math.random() * (startLayer === 0 ? 4 : (startLayer === 3 ? 3 : 4)));
      
      const path = [`${startLayer}-${startNode}`];
      
      // Activate this path
      setPulseNodes(prev => ({...prev, [path[0]]: true}));
      
      // Clear pulse after animation completes
      setTimeout(() => {
        setPulseNodes(prev => {
          const updated = {...prev};
          delete updated[path[0]];
          return updated;
        });
      }, 2000);
    }, isHovered ? 400 : 1500);
    
    return () => clearInterval(interval);
  }, [isHovered]);
  
  // Colors
  const primaryColor = useColorModeValue('#0088cc', '#4FD1C5');
  const primaryColorFaded = useColorModeValue('rgba(0,136,204,0.2)', 'rgba(79,209,197,0.2)');
  const secondaryColor = useColorModeValue('#00ccaa', '#68D391');
  const tertiaryColor = useColorModeValue('#6b46c1', '#9F7AEA');
  const accentColor = useColorModeValue('#f59e0b', '#F6AD55');
  const bgColor = useColorModeValue('white', 'darkBg.900');
  const nodeColor = useColorModeValue('#f8f8f8', '#2D3748');
  const lineColor = useColorModeValue('rgba(0,0,0,0.04)', 'rgba(255,255,255,0.04)');
  
  // Node coordinates for complexity
  const layerPositions = [
    // Layer 1 - Input layer (x, y)
    [{x: 100, y: 120}, {x: 100, y: 220}, {x: 100, y: 320}, {x: 100, y: 420}, {x: 100, y: 520}],
    // Layer 2 - Hidden layer 1
    [{x: 200, y: 100}, {x: 200, y: 200}, {x: 200, y: 300}, {x: 200, y: 400}, {x: 200, y: 500}],
    // Layer 3 - Hidden layer 2
    [{x: 325, y: 150}, {x: 325, y: 250}, {x: 325, y: 350}, {x: 325, y: 450}],
    // Layer 4 - Hidden layer 3
    [{x: 450, y: 170}, {x: 450, y: 270}, {x: 450, y: 370}, {x: 450, y: 470}],
    // Layer 5 - Hidden layer 4
    [{x: 575, y: 220}, {x: 575, y: 320}, {x: 575, y: 420}],
    // Layer 6 - Output layer
    [{x: 700, y: 300}]
  ];
  
  // Define connection strength for visualization
  const getConnectionStrength = (l1: number, n1: number, l2: number, n2: number) => {
    // This creates a pattern where connections are stronger between nearby nodes
    const distance = Math.abs(n1 - n2 * (layerPositions[l1].length / layerPositions[l2].length));
    return Math.max(0.1, 1 - distance * 0.4);
  };
  
  // Check if node is active
  const isNodeActive = (layer: number, node: number) => {
    const nodeIndex = layer * 5 + node;
    return activeNodes.includes(nodeIndex) || pulseNodes[`${layer}-${node}`];
  };

  return (
    <MotionBox
      ref={containerRef}
      height={height}
      width="100%"
      bg="transparent"
      borderRadius="xl"
      position="relative"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={controls}
      initial={{ rotateZ: 0, scale: 1 }}
      transition={{ duration: isScrolling ? 0.3 : 0.8 }}
      boxShadow="none"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background that matches exactly with the website */}
        <rect width="100%" height="100%" fill={bgColor} />
        
        {/* Very subtle grid pattern */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={lineColor} strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Background matrix-like elements */}
        {Array.from({length: 20}).map((_, i) => (
          <text 
            key={`binary-${i}`}
            x={Math.random() * 750}
            y={Math.random() * 550}
            fill={primaryColorFaded}
            fontSize={Math.random() * 8 + 8}
            opacity={0.2}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </text>
        ))}
        
        {/* Neural network connections - all layers */}
        {layerPositions.map((layer, layerIndex) => {
          if (layerIndex === layerPositions.length - 1) return null; // Skip last layer (no outgoing connections)
          
          return layer.map((startNode, nodeIndex) => {
            const nextLayer = layerPositions[layerIndex + 1];
            
            return nextLayer.map((endNode, endNodeIndex) => {
              const strength = getConnectionStrength(layerIndex, nodeIndex, layerIndex + 1, endNodeIndex);
              const isPathActive = pulseNodes[`${layerIndex}-${nodeIndex}`] || 
                                  pulseNodes[`${layerIndex+1}-${endNodeIndex}`];
              
              const color = layerIndex % 2 === 0 ? primaryColor : secondaryColor;
              
              return (
                <motion.line
                  key={`conn-${layerIndex}-${nodeIndex}-${endNodeIndex}`}
                  x1={startNode.x}
                  y1={startNode.y}
                  x2={endNode.x}
                  y2={endNode.y}
                  stroke={color}
                  strokeWidth={isPathActive ? 2 : 1.5}
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: isHovered ? 1 : 0.5 + (strength * 0.3),
                    opacity: isPathActive ? [0.9, 1, 0.9] : [
                      Math.max(0.1, strength * 0.5),
                      Math.max(0.2, strength * 0.7),
                      Math.max(0.1, strength * 0.5)
                    ]
                  }}
                  transition={{ 
                    pathLength: {
                      duration: 2.5 - (strength * 1),
                      repeat: Infinity,
                      repeatType: "reverse"
                    },
                    opacity: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                />
              );
            });
          });
        })}
        
        {/* Data pulses along connections */}
        {isHovered && Array.from({length: 6}).map((_, i) => {
          const startLayerIdx = Math.floor(Math.random() * (layerPositions.length - 1));
          const startNodeIdx = Math.floor(Math.random() * layerPositions[startLayerIdx].length);
          const startNode = layerPositions[startLayerIdx][startNodeIdx];
          
          const endLayerIdx = startLayerIdx + 1;
          const endNodeIdx = Math.floor(Math.random() * layerPositions[endLayerIdx].length);
          const endNode = layerPositions[endLayerIdx][endNodeIdx];
          
          return (
            <motion.circle
              key={`pulse-${i}`}
              r={3}
              fill={accentColor}
              initial={{ 
                cx: startNode.x, 
                cy: startNode.y,
                opacity: 0
              }}
              animate={{ 
                cx: [startNode.x, endNode.x],
                cy: [startNode.y, endNode.y],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            />
          );
        })}
        
        {/* Render all nodes with appropriate styling */}
        {layerPositions.map((layer, layerIndex) => {
          const colors = [primaryColor, secondaryColor, tertiaryColor, primaryColor, secondaryColor, accentColor];
          
          return layer.map((node, nodeIndex) => {
            const isActive = isNodeActive(layerIndex, nodeIndex);
            const size = layerIndex === 0 ? 12 : 
                       layerIndex === layerPositions.length - 1 ? 18 : 10;
            
            return (
              <motion.g key={`node-${layerIndex}-${nodeIndex}`}>
                {/* Glow effect for active nodes */}
                {isActive && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={size + 8}
                    fill="none"
                    stroke={colors[layerIndex]}
                    strokeWidth={2}
                    opacity={0.3}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                
                {/* Main node circle */}
                <motion.circle 
                  cx={node.x} 
                  cy={node.y} 
                  r={size}
                  fill={isActive ? colors[layerIndex] : nodeColor}
                  stroke={colors[layerIndex]}
                  strokeWidth={2}
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: isActive ? [1, 1.2, 1] : isHovered ? [1, 1.1, 1] : 1,
                    fill: isActive ? [nodeColor, colors[layerIndex], nodeColor] : nodeColor
                  }}
                  transition={{ 
                    duration: isActive ? 1 : 2,
                    repeat: (isActive || isHovered) ? Infinity : 0,
                    repeatType: "reverse",
                    delay: nodeIndex * 0.2
                  }}
                />
                
                {/* Labels for input/output nodes */}
                {(layerIndex === 0 || layerIndex === layerPositions.length - 1) && (
                  <text 
                    x={node.x} 
                    y={node.y + 4} 
                    textAnchor="middle" 
                    fontSize={10} 
                    fill={colors[layerIndex]}
                    fontWeight={isActive ? "bold" : "normal"}
                  >
                    {layerIndex === 0 ? `x${nodeIndex}` : 'y'}
                  </text>
                )}
              </motion.g>
            );
          });
        })}
        
        {/* Mathematical annotations for complexity */}
        <motion.text
          x={400}
          y={50}
          textAnchor="middle"
          fontSize={12}
          fill={primaryColor}
          opacity={0.7}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.9 : 0.5 }}
          transition={{ duration: 1 }}
        >
          Neural Network: f(x) = σ(Wx + b)
        </motion.text>
        
        <motion.text
          x={325}
          y={580}
          textAnchor="middle"
          fontSize={10}
          fill={secondaryColor}
          opacity={0.6}
        >
          Activation: ReLU(x) = max(0, x)
        </motion.text>
        
        <motion.text
          x={575}
          y={580}
          textAnchor="middle"
          fontSize={10}
          fill={tertiaryColor}
          opacity={0.6}
        >
          Output: Softmax(z)
        </motion.text>
      </svg>
    </MotionBox>
  );
};

export default NeuralNetworkAnimation;