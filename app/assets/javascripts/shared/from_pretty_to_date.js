function fromPrettyToDate(value) {
  value = value.replace("Jan", "Jan")
               .replace("Fev", "Feb")
               .replace("Mar", "Mar")
               .replace("Abr", "Apr")
               .replace("Mai", "May")
               .replace("Jun", "Jun")
               .replace("Jul", "Jul")
               .replace("Ago", "Aug")
               .replace("Set", "Sep")
               .replace("Out", "Oct")
               .replace("Nov", "Nov")
               .replace("Dez", "Dec")

  value = Date.parse(value)

  return value
  
}