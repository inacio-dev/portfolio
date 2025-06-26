'use client'

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'

interface Node {
  id: number
  x: number
  y: number
  size: number
  color: string
  layer: 'input' | 'hidden' | 'output'
  activationLevel: number
}

interface Connection {
  from: number
  to: number
  weight: number
  active: boolean
}

interface Pulse {
  id: number
  fromNode: number
  toNode: number
  progress: number
  intensity: number
}

// Constantes para melhor performance
const ANIMATION_FRAME_SKIP = 2
const MAX_PULSES = 20
const TRIGGER_INTERVAL = 3000
const PULSE_SPEED = 0.025
const ACTIVATION_DECAY = 0.012
const CONNECTION_DECAY_CHANCE = 0.08

export default function TechNetworkAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastTriggerRef = useRef<number>(0)
  const frameCountRef = useRef<number>(0)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitializedRef = useRef<boolean>(false)

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [pulses, setPulses] = useState<Pulse[]>([])

  // Memoizar configurações da rede para evitar recálculos
  const networkConfig = useMemo(
    () => ({
      margin: 50,
      minColumnWidth: 150,
      minNodeSpacing: 80,
      maxTotalNodes: 10,
      maxColumns: 6,
      maxNodesPerColumn: 8,
    }),
    [],
  )

  // Helper para requestAnimationFrame com fallback - memoizado
  const animationHelpers = useMemo(
    () => ({
      request: (callback: FrameRequestCallback): number => {
        if (typeof requestAnimationFrame !== 'undefined') {
          return requestAnimationFrame(callback)
        }
        return setTimeout(callback, 16) as unknown as number
      },
      cancel: (id: number): void => {
        if (typeof cancelAnimationFrame !== 'undefined') {
          cancelAnimationFrame(id)
        } else {
          clearTimeout(id)
        }
      },
    }),
    [],
  )

  // Otimizar resize com debounce
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current)
    }

    resizeTimeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const newSize = { width: rect.width, height: rect.height }

        // Só atualizar se houve mudança significativa
        setContainerSize((prev) => {
          if (
            Math.abs(prev.width - newSize.width) > 10 ||
            Math.abs(prev.height - newSize.height) > 10
          ) {
            return newSize
          }
          return prev
        })
      }
    }, 100)
  }, [])

  // Configuração da rede neural otimizada
  const initializeNetwork = useCallback(() => {
    if (containerSize.width === 0 || containerSize.height === 0 || isInitializedRef.current) return

    const { margin, minColumnWidth, maxTotalNodes, maxColumns } = networkConfig
    const usableWidth = containerSize.width - margin * 2
    const usableHeight = containerSize.height - margin * 2

    if (usableWidth <= 0 || usableHeight <= 0) return

    const totalColumns = Math.max(3, Math.min(Math.floor(usableWidth / minColumnWidth), maxColumns))

    const hiddenLayers = totalColumns - 2

    let remainingNodes = maxTotalNodes
    const inputCount = Math.min(2, Math.max(1, Math.floor(remainingNodes / totalColumns)))
    remainingNodes -= inputCount
    const outputCount = Math.min(2, Math.max(1, Math.floor(remainingNodes / (hiddenLayers + 1))))
    remainingNodes -= outputCount

    // Criar estrutura de camadas
    const layers = [{ count: inputCount, type: 'input', color: '#9CA3AF' }]

    for (let i = 0; i < hiddenLayers; i++) {
      const isLastHidden = i === hiddenLayers - 1
      const hiddenCount = isLastHidden
        ? Math.max(1, remainingNodes)
        : Math.max(1, Math.floor(remainingNodes / (hiddenLayers - i)))
      remainingNodes -= hiddenCount

      const grayIntensity = Math.max(0x4b, 0x6b - i * 0x08)
      layers.push({
        count: hiddenCount,
        type: 'hidden',
        color: `#${grayIntensity.toString(16).padStart(2, '0')}7280`,
      })
    }

    layers.push({ count: outputCount, type: 'output', color: '#4B5563' })

    // Criar nós de forma otimizada
    const newNodes: Node[] = []
    const newConnections: Connection[] = []
    const layerNodeIds: number[][] = []
    let nodeId = 0

    layers.forEach((layer, layerIndex) => {
      const currentLayerIds: number[] = []
      const columnSpacing = usableWidth / (totalColumns - 1)
      const baseX = margin + layerIndex * columnSpacing
      const xVariation = layerIndex === 0 || layerIndex === layers.length - 1 ? 20 : 40
      const nodeX = baseX + (Math.random() - 0.5) * xVariation
      const verticalSpacing = usableHeight / (layer.count + 1)

      // Criar posições de nós de forma determinística
      const positions = Array.from({ length: layer.count }, (_, i) => i)

      positions.forEach((i) => {
        const baseY = margin + verticalSpacing * (i + 1)
        const yVariation = Math.min(verticalSpacing * 0.3, 25)
        const nodeY = baseY + (Math.random() - 0.5) * yVariation

        newNodes.push({
          id: nodeId,
          x: nodeX,
          y: nodeY,
          size: 2.5 + Math.random() * 1,
          color: layer.color,
          layer: layer.type as 'input' | 'hidden' | 'output',
          activationLevel: 0,
        })

        currentLayerIds.push(nodeId)
        nodeId++
      })

      layerNodeIds.push(currentLayerIds)
    })

    // Criar conexões de forma otimizada
    for (let layerIndex = 0; layerIndex < layerNodeIds.length - 1; layerIndex++) {
      const currentLayer = layerNodeIds[layerIndex]
      const nextLayer = layerNodeIds[layerIndex + 1]
      const layerProduct = currentLayer.length * nextLayer.length

      const connectionProbability =
        layerProduct <= 9 ? 0.9 : layerProduct <= 25 ? 0.7 : layerProduct <= 64 ? 0.5 : 0.3

      for (const fromNodeId of currentLayer) {
        for (const toNodeId of nextLayer) {
          if (Math.random() < connectionProbability) {
            newConnections.push({
              from: fromNodeId,
              to: toNodeId,
              weight: Math.random() * 0.8 + 0.2,
              active: false,
            })
          }
        }
      }
    }

    setNodes(newNodes)
    setConnections(newConnections)
    isInitializedRef.current = true
  }, [containerSize, networkConfig])

  // Criar pulso otimizado
  const createPulse = useCallback((fromNodeId: number, toNodeId: number) => {
    setPulses((prev) => {
      const newPulse: Pulse = {
        id: Date.now() + Math.random(),
        fromNode: fromNodeId,
        toNode: toNodeId,
        progress: 0,
        intensity: Math.random() * 0.6 + 0.4,
      }
      return [...prev.slice(-MAX_PULSES + 1), newPulse]
    })

    setConnections((prev) =>
      prev.map((conn) =>
        conn.from === fromNodeId && conn.to === toNodeId ? { ...conn, active: true } : conn,
      ),
    )
  }, [])

  // Ativação da rede otimizada
  const triggerNetworkActivation = useCallback(() => {
    if (nodes.length === 0) return

    const inputNodes = nodes.filter((node) => node.layer === 'input')
    const activeInputs = inputNodes.filter(() => Math.random() > 0.4)

    if (activeInputs.length === 0) return

    // Ativar nós de entrada
    setNodes((prev) =>
      prev.map((node) => {
        const isActiveInput = activeInputs.some((n) => n.id === node.id)
        return isActiveInput ? { ...node, activationLevel: 0.8 + Math.random() * 0.2 } : node
      }),
    )

    // Propagar através das camadas com delays otimizados
    const nodesByX = new Map<number, Node[]>()
    nodes.forEach((node) => {
      const layerKey = Math.round(node.x / 15)
      if (!nodesByX.has(layerKey)) nodesByX.set(layerKey, [])
      nodesByX.get(layerKey)!.push(node)
    })

    const sortedLayers = Array.from(nodesByX.entries()).sort(([a], [b]) => a - b)

    sortedLayers.forEach((layerData, i) => {
      if (i >= sortedLayers.length - 1) return

      setTimeout(
        () => {
          const currentLayerNodes = layerData[1]
          const activeCurrentNodes = currentLayerNodes.filter(() => Math.random() > 0.3)

          activeCurrentNodes.forEach((currentNode) => {
            const validConnections = connections.filter((conn) => conn.from === currentNode.id)
            const selectedConnections = validConnections.filter(() => Math.random() > 0.4)
            selectedConnections.forEach((conn) => createPulse(conn.from, conn.to))
          })
        },
        150 + i * 400,
      )
    })
  }, [nodes, connections, createPulse])

  // Função de animação otimizada
  const updateAnimation = useCallback(() => {
    const currentTime = Date.now()

    // Atualizar pulsos de forma otimizada
    setPulses((prev) => {
      const updatedPulses = prev
        .map((pulse) => ({ ...pulse, progress: Math.min(1, pulse.progress + PULSE_SPEED) }))
        .filter((pulse) => pulse.progress < 1)

      // Batch de atualizações de nós para pulsos completados
      const completedPulses = prev.filter((pulse) => pulse.progress >= 0.95 && pulse.progress < 1)
      if (completedPulses.length > 0) {
        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            const pulseToNode = completedPulses.find((p) => p.toNode === node.id)
            return pulseToNode
              ? {
                  ...node,
                  activationLevel: Math.min(1, node.activationLevel + pulseToNode.intensity),
                }
              : node
          }),
        )
      }

      return updatedPulses
    })

    // Otimizar atualizações menos frequentes
    if (frameCountRef.current % 3 === 0) {
      setConnections((prev) =>
        prev.map((conn) => ({
          ...conn,
          active: conn.active && Math.random() > CONNECTION_DECAY_CHANCE,
        })),
      )
    }

    if (frameCountRef.current % 2 === 0) {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          activationLevel: Math.max(0, node.activationLevel - ACTIVATION_DECAY),
        })),
      )
    }

    // Trigger periódico
    if (currentTime - lastTriggerRef.current > TRIGGER_INTERVAL) {
      triggerNetworkActivation()
      lastTriggerRef.current = currentTime
    }
  }, [triggerNetworkActivation])

  // Memoizar funções de posicionamento
  const positionHelpers = useMemo(
    () => ({
      getNodePosition: (nodeId: number) => {
        const node = nodes.find((n) => n.id === nodeId)
        return node ? { x: node.x, y: node.y } : { x: 0, y: 0 }
      },
      getConnectionPath: (fromId: number, toId: number) => {
        const from = nodes.find((n) => n.id === fromId)
        const to = nodes.find((n) => n.id === toId)
        if (!from || !to) return ''

        const midX = (from.x + to.x) / 2
        const midY = (from.y + to.y) / 2
        const offsetX = (to.x - from.x) * 0.2
        const offsetY = Math.sin(fromId + toId) * 12

        return `M ${from.x} ${from.y} Q ${midX + offsetX} ${midY + offsetY} ${to.x} ${to.y}`
      },
      getPulsePosition: (pulse: Pulse) => {
        const from = nodes.find((n) => n.id === pulse.fromNode)
        const to = nodes.find((n) => n.id === pulse.toNode)
        if (!from || !to) return { x: 0, y: 0 }

        const midX = (from.x + to.x) / 2
        const midY = (from.y + to.y) / 2
        const offsetX = (to.x - from.x) * 0.2
        const offsetY = Math.sin(pulse.fromNode + pulse.toNode) * 12

        const t = pulse.progress
        const x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * (midX + offsetX) + t * t * to.x
        const y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * (midY + offsetY) + t * t * to.y

        return { x, y }
      },
    }),
    [nodes],
  )

  // Setup inicial e resize com useLayoutEffect para evitar flash
  useLayoutEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setContainerSize({ width: rect.width, height: rect.height })
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [handleResize])

  // Inicializar rede quando necessário
  useLayoutEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0 && !isInitializedRef.current) {
      initializeNetwork()
    }
  }, [containerSize.width, containerSize.height, initializeNetwork])

  // Loop de animação otimizado
  useLayoutEffect(() => {
    if (nodes.length === 0) return

    const animate = () => {
      frameCountRef.current++
      if (frameCountRef.current % ANIMATION_FRAME_SKIP === 0) {
        updateAnimation()
      }
      animationFrameRef.current = animationHelpers.request(animate)
    }

    animationFrameRef.current = animationHelpers.request(animate)

    return () => {
      if (animationFrameRef.current) {
        animationHelpers.cancel(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [nodes.length, updateAnimation, animationHelpers])

  // Cleanup ao desmontar
  useLayoutEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        animationHelpers.cancel(animationFrameRef.current)
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [animationHelpers])

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full">
      <svg
        className="absolute inset-0 h-full w-full"
        width={containerSize.width}
        height={containerSize.height}
        viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
      >
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6B7280" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="activeConnectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B7280" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4B5563" stopOpacity="0.5" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Conexões */}
        {connections.map((conn) => (
          <path
            key={`${conn.from}-${conn.to}`}
            d={positionHelpers.getConnectionPath(conn.from, conn.to)}
            fill="none"
            stroke={conn.active ? 'url(#activeConnectionGradient)' : 'url(#connectionGradient)'}
            strokeWidth={conn.active ? '1.5' : '0.8'}
            opacity={conn.active ? '0.5' : '0.2'}
          />
        ))}

        {/* Pulsos */}
        {pulses.map((pulse) => {
          const position = positionHelpers.getPulsePosition(pulse)
          return (
            <circle
              key={pulse.id}
              cx={position.x}
              cy={position.y}
              r="2"
              fill="#D1D5DB"
              filter="url(#glow)"
              opacity={pulse.intensity * 0.8}
            />
          )
        })}

        {/* Nós */}
        {nodes.map((node) => (
          <g key={node.id}>
            {node.activationLevel > 0.1 && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size + 4}
                fill="none"
                stroke={node.color}
                strokeWidth="1"
                opacity={node.activationLevel * 0.4}
              />
            )}

            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              filter="url(#glow)"
              opacity={0.6 + node.activationLevel * 0.4}
            />

            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * 0.5}
              fill="#F9FAFB"
              opacity={0.4 + node.activationLevel * 0.6}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
