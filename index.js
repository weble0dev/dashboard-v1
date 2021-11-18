document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas'),
    
        WIDTH = canvas.offsetWidth,
        HEIGHT = 300,
        DPI_WIDTH = WIDTH * 2,
        DPI_HEIGHT = HEIGHT * 2,
        
        LINE_WIDTH = 12,
        MAX_COLS = 6;

    function renderMainLine(ctx, x) {
        ctx.fillStyle = '#3c3c3c';
        ctx.fillRect(x, 0, LINE_WIDTH, DPI_HEIGHT);
    }

    function renderSecondLine(ctx, x, i) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, calculateLinePadding(lines[i].height), LINE_WIDTH, calculateLineHeight(lines[i].height));
    }

    function calculateLinePadding(h) {
        return DPI_HEIGHT-(DPI_HEIGHT/100*h);
    }

    function calculateLineHeight(h) {
        return DPI_HEIGHT/100*h;
    }

    function calculateLineMargin(cols, id) {
        return Math.round((DPI_WIDTH-LINE_WIDTH*cols)/cols)*id;
    }

    function chart(canvas, data, lines) {
        const ctx = canvas.getContext("2d");

        canvas.style.width = data.WIDTH + 'px';
        canvas.style.height = data.HEIGHT + 'px';
        canvas.width = data.DPI_WIDTH;
        canvas.height = data.DPI_HEIGHT;

        ctx.beginPath();
        
        for (let i = 0; i < MAX_COLS; i++) {
            const width = calculateLineMargin(MAX_COLS, lines[i].id);
            renderMainLine(ctx, width);
            renderSecondLine(ctx, width, i);
        }

        ctx.closePath();

        calculateLineMargin(MAX_COLS)

        console.log(lines)
    }

    chart(canvas, data = {
        WIDTH: WIDTH,
        HEIGHT: HEIGHT,
        DPI_WIDTH: DPI_WIDTH,
        DPI_HEIGHT: DPI_HEIGHT,
    },
    
    lines = [
        line = {
            id: 0,
            height: 14,
        },

        line = {
            id: 1,
            height: 28,
        },

        line = {
            id: 2,
            height: 72,
        },

        line = {
            id: 3,
            height: 85,
        },

        line = {
            id: 4,
            height: 36,
        },

        line = {
            id: 5,
            height: 4
        }
    ])
});