class Wavefront {


    constructor(alto, ancho) {
        this.alto = alto;
        this.ancho = ancho;
        this.compare = (a, b) => {
            return
            this.sort_by_proximity(a) - this.sort_by_proximity(b)
        };
        this.compare.bind(this);
        this.follow_path = [];
    }


    evaluate(cell, value) {
        if (!this.reachedEnd(cell)) {
            var cells = this.souroundCells(cell);
            for (var i = 0; i < cells.length && !this.end; i++) {
                this.setCellValue(cells[i], value + 1);
                this.evaluate(cells[i], value + 1);
            }
        }
        else
            this.end = true;

    }


    souroundCells(cell) {
        var cells = [];
        cells.push(this.createCell(cell.x + 1, cell.y));
        if (x > 0)
            cells.push(this.createCell(cell.x - 1, cell.y));
        cells.push(this.createCell(cell.x, cell.y + 1));
        if (y > 0)
            cells.push(this.createCell(cell.x, cell.y - 1));

        var filtered = cells.filter(x => !this.isColision(x) && this.paths[x.y][x.x] === undefined);
        var a = filtered.map(X => this.sort_by_proximity(X));
        var sorted = filtered.sort((a, b) => this.sort_by_proximity(a) - this.sort_by_proximity(b));
        return sorted;
    }


    createCell(x, y) {
        return {"x": x, "y": y};
    }


    setCellValue(cell, value) {
        if (this.paths[cell.y][cell.x] === undefined || this.paths[cell.y][cell.x] > value)
            this.paths[cell.y][cell.x] = value

    }


    reachedEnd(cell) {
        return this.destiny.colisiona({
            "ancho": this.origin.ancho,
            "alto": this.origin.alto,
            "x": cell.x * pixel.ancho,
            "y": cell.y * pixel.alto
        }) || cell.x === this.puntoFinal.x && cell.y === this.puntoFinal.y;
    }


    isColision(cell) {
        if (this.colisions[cell.y][cell.x] === undefined) {
            this.colisions[cell.y][cell.x] = this.statics.some(x => x.colisiona({
                "ancho": pixel.ancho + pixel.ancho / 2,
                "alto": pixel.alto + pixel.alto / 2,
                "x": cell.x * pixel.ancho,
                "y": cell.y * pixel.alto
            }));
        }
        return this.colisions[cell.y][cell.x];
    }


    sort_by_proximity(cell) {
        return Math.abs(cell.x - Math.round(this.destiny.x / pixel.ancho)) + Math.abs(cell.y - Math.round(this.destiny.y / pixel.alto))
            + Math.random(1);
    }

    wavefront(origen, destino, estaticos) {
        this.destiny = destino;
        this.statics = estaticos;
        this.origin = origen;
        this.paths = new Array(this.alto);
        this.colisions = new Array(this.alto);
        for (var i = 0; i < this.paths.length; i++) {
            this.colisions[i] = new Array(this.ancho);
            this.paths[i] = new Array(this.ancho);
        }
        //Por qué no funciona el splice(0) solo dios lo sabe
        this.end = false;
        this.puntoinicial = this.createCell(Math.round(this.origin.x / pixel.ancho), Math.round(this.origin.y / pixel.ancho));
        this.puntoFinal = this.createCell(Math.round(this.destiny.x / pixel.ancho), Math.round(this.destiny.y / pixel.ancho))
        console.log("Inicio " + this.puntoinicial.x + " " + this.puntoinicial.y);
        console.log("Destino " + this.puntoFinal.x + " " + this.puntoFinal.y);
        this.paths[this.puntoinicial.y][this.puntoinicial.x] = 0;
        this.evaluate(this.puntoinicial, 0);
        return this.paths;
    }

    consume() {
        this.end = false;
        consumeCell(this.puntoFinal);
    }

    consumeCell(cell) {
        if (this.cell == this.puntoinicial)
            this.end = true;
        else {
            var cells = this.souroundCells2(cell);
            for (var i = 0; i < cells.length; i++) {
                this.souroundCells2(cells[i]);
                if (this.end)
                    this.follow_path.push(cells[i]);
            }
        }
    }

    souroundCells2(cell) {
        var cells = [];
        cells.push(this.createCell(cell.x + 1, cell.y));
        if (x > 0)
            cells.push(this.createCell(cell.x - 1, cell.y));
        cells.push(this.createCell(cell.x, cell.y + 1));
        if (y > 0)
            cells.push(this.createCell(cell.x, cell.y - 1));
        var filtered = cells.filter(a => !(this.paths[a.y][a.x] === undefined));
        var sorted = filtered.sort((a, b) => this.paths[a.y][a.x] - this.paths[b.y][b.x]);
        return sorted;
    }


}