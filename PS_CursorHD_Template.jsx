#target photoshop

app.bringToFront();

(function () {
    var originalDialogMode = app.displayDialogs;
    var originalRulerUnits = app.preferences.rulerUnits;

    app.displayDialogs = DialogModes.NO;
    app.preferences.rulerUnits = Units.PIXELS;

    var frameCount = 64;
    var size = 1024;

    var doc = app.documents.add(
        size,
        size,
        72,
        "CursorHD_Animation",
        NewDocumentMode.RGB,
        DocumentFill.TRANSPARENT
    );

    function pad2(n) {
        return (n < 10 ? "0" : "") + n;
    }

    function makeMask() {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        desc.putClass(charIDToTypeID("Nw  "), charIDToTypeID("Chnl"));
        ref.putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("Msk "));
        desc.putReference(charIDToTypeID("At  "), ref);
        desc.putEnumerated(charIDToTypeID("Usng"), charIDToTypeID("UsrM"), charIDToTypeID("RvlS"));
        executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO);
    }

    // Функция отрисовки чёрной сетки пикселями
    function drawBlackGrid(step, count, name, opacity) {
        var layer = doc.artLayers.add();
        layer.name = name;

        var black = new SolidColor();
        black.rgb.red = 0; black.rgb.green = 0; black.rgb.blue = 0;

        for (var i = 1; i < count; i++) {
            var p = i * step;

            // Вертикаль
            doc.selection.select([[p, 0], [p + 1, 0], [p + 1, size], [p, size]]);
            doc.selection.fill(black);

            // Горизонталь
            doc.selection.select([[0, p], [size, p], [size, p + 1], [0, p + 1]]);
            doc.selection.fill(black);
        }
        doc.selection.deselect();
        layer.opacity = opacity;
    }

    try {
        // Создаем сетки как обычные слои (чёрные)
        drawBlackGrid(64, 16, "_GRID_64_BLACK", 25);
        drawBlackGrid(128, 8, "_GRID_128_BLACK", 40);

        // Логика фреймов
        for (var i = frameCount - 1; i >= 0; i--) {
            var layer = doc.artLayers.add();
            layer.name = "Frame " + pad2(i + 1);
            doc.activeLayer = layer;

            var cell = 128;
            var gridSide = 8;
            var x = (i % gridSide) * cell;
            var y = Math.floor(i / gridSide) * cell;

            doc.selection.select([[x, y], [x + cell, y], [x + cell, y + cell], [x, y + cell]]);
            makeMask();
            doc.selection.deselect();
        }

        alert("Всё готово. Чёрные сетки — это слои. Забудь про синие гайды, они в прошлом.");

    } catch (e) {
        alert("Ошибка: " + e.message);
    } finally {
        app.preferences.rulerUnits = originalRulerUnits;
        app.displayDialogs = originalDialogMode;
    }
})();