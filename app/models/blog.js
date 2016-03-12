import DS from 'ember-data';

/*eslint-disable no-unused-vars*/
const {Model, attr, hasMany} = DS;
/*eslint-enable no-unused-vars*/

export default DS.Model.extend({
    name: attr('string'),
    url: attr('string'),
    identification: attr('string'),
    isSelected: attr('boolean'),

    /**
     * Convenience method, marking the blog as selected (and saving)
     */
    select() {
        if (this.isDestroying || this.isDestroyed) {
            return;
        }

        this.set('isSelected', true);
        this.save();
    },

    /**
     * Convenience method, marking the blog as unselected (and saving)
     */
    unselect() {
        if (this.isDestroying || this.isDestroyed) {
            return;
        }

        this.set('isSelected', false);
        this.save();
    },

    /**
     * Uses the operating system's native credential store to set the password
     * for this blog.
     * @param {string} value - Password to set
     */
    setPassword(value) {
        let keytar = requireNode('keytar');
        return keytar.replacePassword(this.get('url'), this.get('identification'), value);
    },

    /**
     * Uses the operating system's native credential store to get the password
     * for this blog.
     * @return {string} Password for this blog
     */
    getPassword() {
        if (!this.get('url') || !this.get('identification')) {
            return null;
        }

        let keytar = requireNode('keytar');
        return keytar.getPassword(this.get('url'), this.get('identification'));
    }
});
