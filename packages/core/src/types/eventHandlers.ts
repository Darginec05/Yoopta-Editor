export type EditorEventHandlers = {
  onDOMBeforeInput?: (event: InputEvent) => void;

  onCopy?: React.ClipboardEventHandler;
  onCopyCapture?: React.ClipboardEventHandler;
  onCut?: React.ClipboardEventHandler;
  onCutCapture?: React.ClipboardEventHandler;
  onPaste?: React.ClipboardEventHandler;
  onPasteCapture?: React.ClipboardEventHandler;

  onCompositionEnd?: React.CompositionEventHandler;
  onCompositionEndCapture?: React.CompositionEventHandler;
  onCompositionStart?: React.CompositionEventHandler;
  onCompositionStartCapture?: React.CompositionEventHandler;
  onCompositionUpdate?: React.CompositionEventHandler;
  onCompositionUpdateCapture?: React.CompositionEventHandler;

  onFocus?: React.FocusEventHandler;
  onFocusCapture?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onBlurCapture?: React.FocusEventHandler;

  onKeyDown?: React.KeyboardEventHandler;
  onKeyDownCapture?: React.KeyboardEventHandler;
  onKeyPress?: React.KeyboardEventHandler;
  onKeyPressCapture?: React.KeyboardEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
  onKeyUpCapture?: React.KeyboardEventHandler;

  onClick?: React.MouseEventHandler;
  onClickCapture?: React.MouseEventHandler;
  onContextMenu?: React.MouseEventHandler;
  onContextMenuCapture?: React.MouseEventHandler;
  onDblClick?: React.MouseEventHandler;
  onDblClickCapture?: React.MouseEventHandler;
  onDrag?: React.DragEventHandler;
  onDragCapture?: React.DragEventHandler;
  onDragEnd?: React.DragEventHandler;
  onDragEndCapture?: React.DragEventHandler;
  onDragEnter?: React.DragEventHandler;
  onDragEnterCapture?: React.DragEventHandler;
  onDragExit?: React.DragEventHandler;
  onDragExitCapture?: React.DragEventHandler;
  onDragLeave?: React.DragEventHandler;
  onDragLeaveCapture?: React.DragEventHandler;
  onDragOver?: React.DragEventHandler;
  onDragOverCapture?: React.DragEventHandler;
  onDragStart?: React.DragEventHandler;
  onDragStartCapture?: React.DragEventHandler;
  onDrop?: React.DragEventHandler;
  onDropCapture?: React.DragEventHandler;
  onMouseDown?: React.MouseEventHandler;
  onMouseDownCapture?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseEnterCapture?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onMouseLeaveCapture?: React.MouseEventHandler;
  onMouseMove?: React.MouseEventHandler;
  onMouseMoveCapture?: React.MouseEventHandler;
  onMouseOut?: React.MouseEventHandler;
  onMouseOutCapture?: React.MouseEventHandler;
  onMouseOver?: React.MouseEventHandler;
  onMouseOverCapture?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  onMouseUpCapture?: React.MouseEventHandler;

  onSelect?: React.EventHandler<React.SyntheticEvent>;
  onSelectCapture?: React.EventHandler<React.SyntheticEvent>;

  onTouchCancel?: React.TouchEventHandler;
  onTouchCancelCapture?: React.TouchEventHandler;
  onTouchEnd?: React.TouchEventHandler;
  onTouchEndCapture?: React.TouchEventHandler;
  onTouchMove?: React.TouchEventHandler;
  onTouchMoveCapture?: React.TouchEventHandler;
  onTouchStart?: React.TouchEventHandler;
  onTouchStartCapture?: React.TouchEventHandler;

  onPointerOver?: React.PointerEventHandler;
  onPointerOverCapture?: React.PointerEventHandler;
  onPointerEnter?: React.PointerEventHandler;
  onPointerEnterCapture?: React.PointerEventHandler;
  onPointerDown?: React.PointerEventHandler;
  onPointerDownCapture?: React.PointerEventHandler;
  onPointerMove?: React.PointerEventHandler;
  onPointerMoveCapture?: React.PointerEventHandler;
  onPointerUp?: React.PointerEventHandler;
  onPointerUpCapture?: React.PointerEventHandler;
  onPointerCancel?: React.PointerEventHandler;
  onPointerCancelCapture?: React.PointerEventHandler;
  onPointerOut?: React.PointerEventHandler;
  onPointerOutCapture?: React.PointerEventHandler;
  onPointerLeave?: React.PointerEventHandler;
  onPointerLeaveCapture?: React.PointerEventHandler;
  onGotPointerCapture?: React.PointerEventHandler;
  onGotPointerCaptureCapture?: React.PointerEventHandler;
  onLostPointerCapture?: React.PointerEventHandler;
  onLostPointerCaptureCapture?: React.PointerEventHandler;

  onScroll?: React.UIEventHandler;
  onScrollCapture?: React.UIEventHandler;

  onWheel?: React.WheelEventHandler;
  onWheelCapture?: React.WheelEventHandler;

  onAnimationStart?: React.AnimationEventHandler;
  onAnimationStartCapture?: React.AnimationEventHandler;
  onAnimationEnd?: React.AnimationEventHandler;
  onAnimationEndCapture?: React.AnimationEventHandler;
  onAnimationIteration?: React.AnimationEventHandler;
  onAnimationIterationCapture?: React.AnimationEventHandler;

  onTransitionEnd?: React.TransitionEventHandler;
  onTransitionEndCapture?: React.TransitionEventHandler;
};
