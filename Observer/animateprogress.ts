function animateProgress(el: HTMLInputElement, valueSkill: any) {
    const getRequestAnimationFrame = () => {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function(cb) {
            window.setTimeout(cb, 1/60*1000);
        };
    };

    const fpAnimationFrame = getRequestAnimationFrame()
    let count: any = 0;

    const animation = () => {
        if (count <= valueSkill) {
            el.setAttribute('value', count)
            count++;
            fpAnimationFrame(animation)
        }
    }

    fpAnimationFrame(animation);
};

export default animateProgress;