document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas'),
    
        WIDTH = canvas.offsetWidth,
        HEIGHT = document.body.offsetHeight/2,
        DPI_WIDTH = WIDTH * 2,
        DPI_HEIGHT = HEIGHT * 2,
        
        LINE_WIDTH = 12,
        TEXT_LEFT_MARGIN = document.body.offsetWidth/25;
        MAX_COLS = 6,
        PADDING_BOTTOM = 10,

        FONT_SIZE = 30,

        MAIN_CHART_DATA = [
            line = {
                id: 0,
                users: 5,
                month: 'jan'
            },
    
            line = {
                id: 1,
                users: 7,
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
                users: 54,
                month: 'june'
            }
        ];

    function calculateUserDifference(u1, u2) {
        return (u2-u1)*100/u1;
    }

    function calculateLinePadding(u1, u2) {
        return DPI_HEIGHT-(DPI_HEIGHT/100*calculateUserDifference(u1, u2))-(PADDING_BOTTOM+FONT_SIZE/2);
    };

    function calculateLineHeight(u1, u2) {
        return DPI_HEIGHT/100*calculateUserDifference(u1, u2);
    };

    function calculateLineMargin(cols, id) {
        return Math.round((DPI_WIDTH-LINE_WIDTH*cols)/cols)*id;
    };

    function renderMainLine(ctx, x) {
        const lineHeight = DPI_HEIGHT-(PADDING_BOTTOM+FONT_SIZE/2);
        
        ctx.fillStyle = '#3c3c3c';
        ctx.fillRect(x, 0, LINE_WIDTH, lineHeight);
        
        return;
    };

    function renderSecondLine(ctx, x, i, u1, u2) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, calculateLinePadding(u1, u2), LINE_WIDTH, calculateLineHeight(u1, u2));
        
        return;
    };

    function renderChartText(ctx, x, month) {
        ctx.font = `${FONT_SIZE}px sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(month.toUpperCase(), x+TEXT_LEFT_MARGIN, DPI_HEIGHT-10);
        
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
            const width = calculateLineMargin(MAX_COLS, mainChartData[i].id),
                users2 = mainChartData[i].users;

            let users1 = mainChartData[i];

            if (users1.id === 0) {
                users1 = 0;
            } else {
                users1 = mainChartData[i-1].users 
            }

            renderMainLine(ctx, width);
            
            if (mainChartData[i].id === 0) {
                renderSecondLine(ctx, width, i, 0, 0);
            } else {
                renderSecondLine(ctx, width, i, users1, users2);
            };
            
            renderChartText(ctx, width, mainChartData[i].month);
        }

        ctx.closePath();

        return;
    }

    chart(canvas, data = {
        WIDTH: WIDTH,
        HEIGHT: HEIGHT,
        DPI_WIDTH: DPI_WIDTH,
        DPI_HEIGHT: DPI_HEIGHT,
    }, MAIN_CHART_DATA)
});