import { makeAutoObservable } from 'mobx';

interface Modal {
  // "members" are the declarations in an interface that define the shape and structure of the object that adheres to it.
  open: boolean;
  body: JSX.Element | null;
}

export default class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (content: JSX.Element) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  closeModal = () => {
    this.modal.open = false;
  };
}
