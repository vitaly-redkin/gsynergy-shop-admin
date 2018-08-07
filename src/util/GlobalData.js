/**
 * Application global data variables.
 */

 /**
  * Product user drags to the category.
  * We need to use this global variable since dataTransfer.getData() is not available
  * in the dragOver/dragEnter/dragLeave events.
  */
export const globalData = { draggedProduct: null };