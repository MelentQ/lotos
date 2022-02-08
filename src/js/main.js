import polyfills from './build-in/polyfills';
import './build-in/lazyload';
import detectTouch from './build-in/detectTouch';
import setScrollbarWidth from './build-in/setScrollbarWidth';
import validation from './build-in/validation';
import customSelects from './build-in/customSelects';
import masks from './build-in/masks';
import fileUpload from './build-in/fileUpload';
import anchorLinks from './build-in/anchorLinks';
import mediaPlayer from './build-in/mediaPlayer';
import datepicker from './build-in/datepicker';
import accordions from './build-in/accordions';
import modals from './build-in/modals';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import editableTextContainer from './custom/editableTextContainer';

import './libs/choices.min.js';
import './libs/circletype.min.js';
// import './libs/kinetic.min.js' canvas jsdom
import './libs/bodyScrollLock.min.js';
import './libs/perfect-scrollbar.min.js';
import './utils';
import './todo-main.js';
import './popup';
import './components/banner';
import './components/feedback';
import './components/geography';
import './components/partners';
import alignHeights from './custom/alignHeights';
import initSliders from './custom/initSliders';
import validateForms from './custom/formValidation';
import initMaps from './custom/initMaps';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
    polyfills();
    detectTouch();
    setScrollbarWidth();
    validation();
    customSelects();
    masks();
    fileUpload();
    anchorLinks();
    accordions();
    mediaPlayer();
    modals();
    datepicker();

    // custom

    editableTextContainer();
    alignHeights('.steps__list', '.steps__list-item-name');
    initSliders();
    validateForms();
    initMaps();
});

document.addEventListener('lazyloaded', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    ScrollTrigger.refresh();
    setTimeout(() => document.body.classList.add('animatable'), 300);
});
