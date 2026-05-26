// CursorHD_StackedPreview.jsx
// Создаёт композиции: CursorHD_Build (128×128, 64 кадра) и CursorHD_Main (1024×1024, 64 кадра).
// В CursorHD_Main слои наложены с задержкой: 0-й слой виден с 0 кадра, 1-й — с 1-го, и так далее.
// В результате анимация "собирается" на экране.

(function () {
    app.beginUndoGroup("CursorHD Stacked Preview");

    var proj = app.project;
    var fps = 60.0;
    var frameCount = 64;
    var cellSize = 128;
    var gridSize = 1024;
    var frameDuration = 1 / fps;

    // Удаляем одноимённые композиции, если они уже есть
    function removeCompByName(name) {
        for (var i = proj.items.length; i >= 1; i--) {
            if (proj.items[i] instanceof CompItem && proj.items[i].name === name) {
                proj.items[i].remove();
            }
        }
    }
    removeCompByName("CursorHD_Build");
    removeCompByName("CursorHD_Main");

    // 1. Композиция для покадрового рисования
    var compBuild = proj.items.addComp("CursorHD_Build", cellSize, cellSize, 1,
        frameCount * frameDuration, fps);
    // Прозрачный фон
    var bg = compBuild.layers.addSolid([1, 1, 1], "Background", cellSize, cellSize, 1);
    bg.property("Opacity").setValue(0);

    // 2. Основная композиция с сеткой
    var compMain = proj.items.addComp("CursorHD_Main", gridSize, gridSize, 1,
        frameCount * frameDuration, fps);

    // Добавляем 64 слоя, смещая старт каждого на один кадр
    for (var i = 0; i < frameCount; i++) {
        var layer = compMain.layers.add(compBuild);
        layer.name = "Frame " + (i + 1);

        // Фиксируем Time Remap на i-м кадре
        layer.timeRemapEnabled = true;
        var timeRemap = layer.property("ADBE Time Remap");
        if (timeRemap) {
            timeRemap.expression = "framesToTime(" + i + ")";
        }

        // Старт слоя сдвигаем на i кадров, длительность — до конца композиции
        layer.startTime = i * frameDuration;
        layer.outPoint = compMain.duration;   // остаётся видимым до самого конца

        // Раскладываем в сетку 8×8
        var col = i % 8;
        var row = Math.floor(i / 8);
        layer.property("Position").setValue([col * cellSize + cellSize / 2,
        row * cellSize + cellSize / 2]);
    }

    app.endUndoGroup();

    alert("Готово!\n\n" +
        "• CursorHD_Build – рисуйте 64 кадра анимации.\n" +
        "• CursorHD_Main – анимация «заполнения» сетки:\n" +
        "  кадр 0 → только ячейка 0, кадр 1 → ячейки 0 и 1, …\n" +
        "  на кадре 63 видны все 64 кадра.\n\n" +
        "Совет: для экспорта статичного спрайт-листа (где все видны сразу)\n" +
        "удалите строки .startTime и .outPoint и верните стандартную длительность.");
})();