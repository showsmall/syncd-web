import moment from 'moment'
import md5 from 'blueimp-md5'
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

    FormatDateTime(unixtime, format) {
        if (!unixtime) {
            return '--'
        }
        if (!format) {
            format = 'YYYY-MM-DD HH:mm:SS'
        }
        return moment.unix(unixtime).format(format)
    },

    FormatDateFromNow(unixtime) {
        if (!unixtime) {
            return '--'
        }
        return moment.unix(unixtime).fromNow()
    },

    Md5Sum(str) {
        return md5(str);
    },

    ResetPagination(pagination, adjustNum) {
        if (!adjustNum) {
            adjustNum = -1
        }
        pagination.total += adjustNum
        let maxPage = Math.ceil(pagination.total/pagination.pageSize)
        if (pagination.current > maxPage) {
            pagination.current = maxPage
        }
    },
}
