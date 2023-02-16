const t=`<div class="modal fade" tabindex="-1" role="dialog" rv-add-class="modal.contextualClass | prepend 'modal-'">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" rv-show="modal.title">
        <h5 class="modal-title" rv-template="modal.title"></h5>
        <button type="button" class="btn-close" aria-label="Close" rv-on-click="dismiss"></button>
      </div>
      <div class="modal-body">
        <p rv-template="modal.message"></p>
      </div>
      <div class="modal-footer" rv-show="modal.buttons | size | gt 0">
        <div rv-each-button="modal.buttons">
          <button type="button" class="btn" rv-add-class="button.class" rv-on-click="button.action" rv-template="modal.label"></button>
        </div>
      </div>
    </div>
  </div>
</div>`;export{t as default};
