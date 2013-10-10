class @Clock

  radii: null

  constructor: ->
    @canvas = document.getElementById("clock")
    @context = @canvas.getContext("2d")
    @clear()

    @radii =
      hour: @canvas.width * .2
      minute: @canvas.width * .3
      second: @canvas.width * .4
    @strokes =
      hour: @canvas.width/20
      minute: @canvas.width/20
      second: @canvas.width/20

    @render()

  clear: ->
    @fitParent()
    @context.clearRect(0, 0, @canvas.width, @canvas.height)

  render: ->
    @clear()

    date = new Date()
    angles =
      hour: date.getHours() / 24
      minute: date.getMinutes() / 60
      second: date.getSeconds() / 60

    x = @canvas.width/2
    y = @canvas.height/2
    startAngle = -Math.PI/2

    for unit, angle of angles
      radius = @radii[unit]
      endAngle = (Math.PI * 2 * angles[unit]) - Math.PI/2
      # console.log unit, angles[unit] if unit is "minute"
      @context.beginPath()
      @context.arc(x, y, radius, startAngle, endAngle)
      @context.lineWidth = @strokes[unit]
      @context.strokeStyle = '#CCC'
      @context.stroke()

    requestAnimationFrame =>
      @render()

  # Stetch canvas to fit parent DOM element
  fitParent: ->
    @canvas.style.width = "100%"
    @canvas.style.height = "100%"
    @canvas.width = @canvas.offsetWidth
    @canvas.height = @canvas.offsetHeight