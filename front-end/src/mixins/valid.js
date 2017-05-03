export default {
  methods: {
    isValid (value, message) {
      if (value.length >= 6 && value.length <= 20) {
        return {
          valid: true
        }
      } else {
        return {
          valid: false,
          msg: message
        }
      }
    }
  }
}
