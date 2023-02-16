const t=`<div class="toast-container">
  <div aria-live="polite" aria-atomic="true" class="toast-item-container" rv-add-class="positionClass">
    <div rv-each-toast="notifications" >
      <div rv-if="toast.type | eq 'toast'">
        <bs5-toast-item rv-index="%toast%" rv-parent rv-icon-url="iconUrl" rv-co-toast="toast"></bs5-toast-item>
      </div>
    </div>
  </div>
</div>
<div rv-each-modal="notifications">
  <div rv-if="modal.type | eq 'modal'">
    <bs5-modal-item rv-index="%modal%" rv-parent rv-icon-url="iconUrl" rv-co-modal="modal"></bs5-modal-item>
  </div>
</div>`;export{t as default};
