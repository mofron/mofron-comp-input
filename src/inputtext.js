/**
 * @file   Input.js
 * @brief  Base of UI InputText Class
 * @author simpart
 */

mofron.parts.InputText = class extends mofron.parts.Base {
    
    constructor (prm) {
        try {
            super(prm);
            this.txt_val = null;
            this.text(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getTarget() {
        try {
            return this.vdom.getChild(0);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initContents (vd, prm) {
        try {
            /* set tag */
            vd.addChild(new mofron.util.Vdom('input'));
            
            /* set default size */
            this.width(200);
            this.height(25);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (val) {
        try {
            var _val  = (val === undefined) ? null : val;
            var input = this.getStyleTgt();
            if (null === _val) {
                return input.getStyle('width');
            }
            if ('number' != (typeof _val)) {
                throw new Error('invalid parameter');
            }
            input.setStyle('width', val + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (val) {
        try {
            var _val = (val === undefined) ? null : val;
            var input = this.getStyleTgt();
            if (null === _val) {
                return input.getStyle('height');
            }
            if ('number' != (typeof _val)) {
                throw new Error('invalid parameter');
            }
            input.setStyle('height', val + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (val) {
        try {
            var _val = (val === undefined) ? null : val;
            var vd   = this.getTarget();
            if (false === vd.isPushed()) {
                if (null !== _val) {
                    this.txt_val = _val;
                    return;
                }
                return null;
            }
            var dm = document.querySelector('#'+vd.getId());
            if (null !== _val) {
                dm.value = _val;
            } else {
                return dm.value; 
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    init (disp) {
        try {
            super.init(disp);
            if (null !== this.txt_val) {
                this.text(this.txt_val);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
