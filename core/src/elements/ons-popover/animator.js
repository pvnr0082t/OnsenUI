/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
import util from 'ons/util';
import BaseAnimator from 'ons/base-animator';
import AnimatorFactory from 'ons/internal/animator-factory';
import {fade, union, scale} from 'ons/animations';

class PopoverAnimator extends BaseAnimator {

  constructor(options = {}) {
    super(util.extend({timing: 'cubic-bezier(.1, .7, .4, 1)'}, options));
  }

  show({element, callback}) {
    callback();
  }

  hide({element, callback}) {
    callback();
  }
}


class MDFadePopoverAnimator extends PopoverAnimator {
  show({element, callback}) {
    this._animateAll(element, {
      _mask: fade.in,
      _popover: {animation: fade.in, restore: true, callback}
    });
  }

  hide({element, callback}) {
    this._animateAll(element, {
      _mask: fade.out,
      _popover: {animation: fade.out, restore: true, callback}
    });
  }
}

class IOSFadePopoverAnimator extends MDFadePopoverAnimator {
  show({element, callback}) {
    this._animateAll(element, {
      _mask: fade.in,
      _popover: {
        animation: union(scale({from: 1.3, to: 1}), fade.in),
        restore: true,
        callback
      }
    });
  }
}

export default new AnimatorFactory({
  base: PopoverAnimator,
  animators: {
    'default': 'fade',
    'none': PopoverAnimator,
    'fade-ios': IOSFadePopoverAnimator,
    'fade-md': MDFadePopoverAnimator
  },
  methods: ['show', 'hide']
});
