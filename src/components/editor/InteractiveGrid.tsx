import React from 'react';
import { useGrid } from '../../context/GridContext';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { SortableBox } from './SortableBox';

interface InteractiveGridProps {
  toolSlug?: string;
  isCompact?: boolean;
}

export const InteractiveGrid: React.FC<InteractiveGridProps> = ({ toolSlug, isCompact = false }) => {
  const { boxes, config, removeBox, updateBox, moveBox, reorderBoxes, isPreview } = useGrid();
  const [resizing, setResizing] = React.useState<{ id: string; startX: number; startY: number; startW: number; startH: number } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = boxes.findIndex((box) => box.id === active.id);
      const newIndex = boxes.findIndex((box) => box.id === over.id);
      reorderBoxes(oldIndex, newIndex);
    }
  };

  const handleResizeStart = (e: React.MouseEvent, box: any) => {
    e.preventDefault();
    setResizing({
      id: box.id,
      startX: e.clientX,
      startY: e.clientY,
      startW: box.w,
      startH: box.h,
    });
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing) return;

      const gridElement = document.getElementById('bento-grid-interactive');
      if (!gridElement) return;

      const gridWidth = gridElement.offsetWidth;
      const colWidth = gridWidth / config.columns;
      const rowHeight = isCompact ? 60 : 100;

      const deltaX = e.clientX - resizing.startX;
      const deltaY = e.clientY - resizing.startY;

      const newW = Math.max(1, Math.min(config.columns, Math.round(resizing.startW + deltaX / colWidth)));
      const newH = Math.max(1, Math.round(resizing.startH + deltaY / (rowHeight + config.gap)));

      updateBox(resizing.id, { w: newW, h: newH });
    };

    const handleMouseUp = () => {
      setResizing(null);
    };

    if (resizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, config, updateBox, isCompact]);

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div 
        id="bento-grid-interactive"
        className={`grid grid-cols-${config.columns} w-full h-full`}
        style={{ 
          gap: `${config.gap}px`,
          gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
          gridAutoFlow: config.autoFlow || 'row',
          gridAutoRows: `${isCompact ? 60 : (config.autoRows || 100)}px`,
        }}
      >
        <SortableContext 
          items={boxes.map(b => b.id)}
          strategy={rectSortingStrategy}
        >
          {boxes.map((box, index) => (
            <SortableBox 
              key={box.id}
              box={box}
              index={index}
              config={config}
              isPreview={isPreview}
              toolSlug={toolSlug}
              removeBox={removeBox}
              updateBox={updateBox}
              moveBox={moveBox}
              handleResizeStart={handleResizeStart}
              boxesCount={boxes.length}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};
