import EventEmitter from 'events';
// import _ from 'lodash';


const _emitter = new EventEmitter();
_emitter.setMaxListeners(100); //Giới hạn số lượng listener

export const emitter  = _emitter;