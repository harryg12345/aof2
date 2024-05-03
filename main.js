status = ""
obj = ""
object = []
function setup() {
    canvas = createCanvas(480, 430)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}
function draw() {
    image(video, 0, 0, 480, 430)
    if (status != "") {
        objectdetector.detect(video, getresult)
        for(i = 0; i < object.length; i++){
            document.getElementById("number_of_objects").innerHTML = "number of objects:"+object.length;
            objname = object[i].label
            objcon = floor(object[i].confidence*100)
            objx = object[i].x
            objy = object[i].y
            objheight = object[i].height
            objwidth = object[i].width
            if(obj == objname){
                fill("red")
                text(objname +" "+objcon+"%",objx+15,objy+15)
                noFill()
                rect(objx,objy,objwidth,objheight)
                document.getElementById("status").innerHTML = "status: object detected"
                objectdetector.detect(getresult)
            }
            else{
                document.getElementById("status").innerHTML = "status: object not detected"
            }
           
        }
    }
    
}
function start(){
    objectdetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "status: started to detect object"
    obj = document.getElementById("input").value
}
function modelLoaded(){
    console.log("model loaded!")
    status = true
}
function getresult(e, r) {
    if (e) {
        console.error(e)
    }
    else {
        console.log(r)
        object = r
    }
}