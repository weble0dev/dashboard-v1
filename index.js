document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas'),
    
        WIDTH = canvas.offsetWidth,
        HEIGHT = document.body.offsetHeight/2,
        DPI_WIDTH = WIDTH * 2,
        DPI_HEIGHT = HEIGHT * 2,
        
        LINE_WIDTH = 12,
        LINE_LEFT_MARGIN = document.body.offsetWidth/25;
        MAX_COLS = 6,
        PADDING_BOTTOM = 10,

        FONT_SIZE = 30,

        MAIN_CHART_DATA = [
            line = {
                id: 0,
                users: 14,
                month: 'jan'
            },
    
            line = {
                id: 1,
                users: 28,
                month: 'feb'
            },
    
            line = {
                id: 2,
                users: 72,
                month: 'mar'
            },
    
            line = {
                id: 3,
                users: 85,
                month: 'apr'
            },
    
            line = {
                id: 4,
                users: 36,
                month: 'may'
            },
    
            line = {
                id: 5,
                users: 4,
                month: 'june'
            }
        ];

    function calculateLinePadding(h) {
        return DPI_HEIGHT-(DPI_HEIGHT/100*h)-(FONT_SIZE/2);
    };

    function calculateLineHeight(h) {
        return DPI_HEIGHT/100*h;
    };

    function calculateLineMargin(cols, id) {
        return Math.round((DPI_WIDTH-LINE_WIDTH*cols)/cols)*id;
    };

    function renderMainLine(ctx, x) {
        ctx.fillStyle = '#3c3c3c';
        ctx.fillRect(x, 0, LINE_WIDTH, DPI_HEIGHT-(PADDING_BOTTOM+FONT_SIZE/2));
        return;
    };

    function renderSecondLine(ctx, x, i, users) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, calculateLinePadding(users), LINE_WIDTH, calculateLineHeight(users));
        return;
    };

    function renderChartText(ctx, x, month) {
        ctx.font = `${FONT_SIZE}px sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(month.toUpperCase(), x+LINE_LEFT_MARGIN, DPI_HEIGHT-10);
        return;
    }

    function chart(canvas, data, mainChartData) {
        const ctx = canvas.getContext("2d");

        canvas.style.width = data.WIDTH + 'px';
        canvas.style.height = data.HEIGHT + 'px';
        canvas.width = data.DPI_WIDTH;
        canvas.height = data.DPI_HEIGHT;

        ctx.beginPath();
        
        for (let i = 0; i < MAX_COLS; i++) {
            const width = calculateLineMargin(MAX_COLS, mainChartData[i].id);

            renderMainLine(ctx, width);
            renderSecondLine(ctx, width, i, mainChartData[i].users);
            renderChartText(ctx, width, mainChartData[i].month);
        }

        ctx.closePath();
    }

    chart(canvas, data = {
        WIDTH: WIDTH,
        HEIGHT: HEIGHT,
        DPI_WIDTH: DPI_WIDTH,
        DPI_HEIGHT: DPI_HEIGHT,
    }, MAIN_CHART_DATA)
});