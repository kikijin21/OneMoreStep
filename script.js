< script >
    const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

const checkpoints = [{
        x: 50,
        y: 300,
        label: 'Entrance'
    },
    {
        x: 200,
        y: 300,
        label: 'Room 1'
    },
    {
        x: 400,
        y: 300,
        label: 'Room 2'
    },
    {
        x: 400,
        y: 150,
        label: 'Restroom'
    },
    {
        x: 600,
        y: 300,
        label: 'Room 4'
    },
    {
        x: 200,
        y: 150,
        label: 'Cafeteria'
    },
    {
        x: 600,
        y: 150,
        label: 'Conference Room'
    },
    {
        x: 50,
        y: 450,
        label: 'Parking'
    }
];

const graph = {
    "Entrance": ["Room 1", "Parking"],
    "Room 1": ["Entrance", "Room 2", "Cafeteria"],
    "Room 2": ["Room 1", "Restroom", "Room 4"],
    "Restroom": ["Room 2", "Cafeteria"],
    "Room 4": ["Room 2", "Conference Room"],
    "Cafeteria": ["Room 1", "Restroom"],
    "Conference Room": ["Room 4"],
    "Parking": ["Entrance"]
};

// 播报语音函数
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

// 计算两点之间的距离
function calculateDistance(pointA, pointB) {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    return (Math.sqrt(dx * dx + dy * dy) * 0.1).toFixed(1); // 每单位距离为10米
}

// 动态计算“向前”、“左转”、“右转”
function calculateAction(pointA, pointB, previousDirection) {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;

    const distance = calculateDistance(pointA, pointB);

    // 计算方向（基于当前方向）
    if (previousDirection === 'horizontal') {
        if (dy < 0) return `Turn left and walk ${distance} meters.`;
        if (dy > 0) return `Turn right and walk ${distance} meters.`;
    } else if (previousDirection === 'vertical') {
        if (dx > 0) return `Turn right and walk ${distance} meters.`;
        if (dx < 0) return `Turn left and walk ${distance} meters.`;
    }

    // 默认向前
    return `Walk forward ${distance} meters.`;
}

// 绘制检查点
function drawCheckpoints() {
    checkpoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#00AEEF';
        ctx.fill();
        ctx.closePath();

        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText(point.label, point.x + 15, point.y + 5);
    });
}

// 绘制所有路径
function drawAllPaths() {
    for (const [start, destinations] of Object.entries(graph)) {
        const startPoint = checkpoints.find(point => point.label === start);
        destinations.forEach(destination => {
            const endPoint = checkpoints.find(point => point.label === destination);
            const gradient = ctx.createLinearGradient(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
            gradient.addColorStop(0, '#00AEEF');
            gradient.addColorStop(1, '#007bbf');

            ctx.beginPath();
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        });
    }
}

// 初始化地图
function initMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAllPaths();
    drawCheckpoints();
}

// 动态绘制路径并播报行动指示
function animatePath(route, index = 0, previousDirection = 'horizontal') {
    if (index >= route.length - 1) return;

    const start = route[index];
    const end = route[index + 1];
    const action = calculateAction(start, end, previousDirection);

    let progress = 0;
    const animation = setInterval(() => {
        if (progress > 1) {
            clearInterval(animation);
            speakText(action);
            const newDirection = (start.x === end.x) ? 'vertical' : 'horizontal';
            animatePath(route, index + 1, newDirection);
        } else {
            const currentX = start.x + (end.x - start.x) * progress;
            const currentY = start.y + (end.y - start.y) * progress;
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(currentX, currentY);
            ctx.strokeStyle = '#FF5733';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();
            progress += 0.05;
        }
    }, 30);
}

// 广度优先搜索计算最短路径
function findShortestPath(start, end) {
    const queue = [
        [start]
    ];
    const visited = new Set();

    while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];

        if (node === end) return path;

        if (!visited.has(node)) {
            visited.add(node);
            const neighbors = graph[node] || [];
            neighbors.forEach(neighbor => {
                queue.push([...path, neighbor]);
            });
        }
    }
    return null;
}

// 获取路径坐标
function getPathCoordinates(path) {
    return path.map(label => checkpoints.find(point => point.label === label));
}

// 事件绑定
document.getElementById('scanNFCButton').addEventListener('click', () => {
    const startPoint = document.getElementById('startPoint').value;
    speakText(`Starting point set to ${startPoint}`);
});

document.getElementById('planRouteButton').addEventListener('click', () => {
    const startPoint = document.getElementById('startPoint').value;
    const destination = document.getElementById('destination').value;

    const shortestPath = findShortestPath(startPoint, destination);
    if (shortestPath) {
        const route = getPathCoordinates(shortestPath);
        initMap();
        speakText(`Planning route from ${startPoint} to ${destination}`);
        animatePath(route);
    } else {
        alert('Route not found!');
    }
});

// 初始化地图
initMap(); <
/script>
