
export default {

    GotoRouter(name, query) {
        this.$router.push({name, query})
    },

    ResolveFormError(err, values) {
        let key = Object.getOwnPropertyNames(err).shift()
        if (key && err[key] && err[key].errors && err[key].errors.length) {
            let msg = err[key].errors[0].message
            let field = err[key].errors[0].field
            this.$message.error(msg);

            let targetTop = this.$jQuery("#" + field).offset().top
            this.$jQuery('body,html').animate({scrollTop: targetTop - 20}, 1000);
        }
    },

}
