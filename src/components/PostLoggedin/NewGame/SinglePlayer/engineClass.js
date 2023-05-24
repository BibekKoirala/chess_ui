import { Chess } from "chess.js";

export default class ChessEngine {

    constructor(player, fen) {
        if (fen) {
            this.game = new Chess(fen);
        } else {
            this.game = new Chess();
        }

        this.player = player;
        
        this.engine = new Worker('stockfish.js');
        this.engineStatus = {};
        this.time = { wtime: 100000, btime: 100000, winc: 1000, binc: 1000, depth: 10 };
        this.displayScore = false;
        this.isEngineRunning = false;

        this.uciCmd = this.uciCmd.bind(this);
        this.displayStatus = this.displayStatus.bind(this);
        this.get_moves = this.get_moves.bind(this);
        this.prepareMove = this.prepareMove.bind(this);
        this.OnEngineMessage = this.OnEngineMessage.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.GetCurrentPosition = this.GetCurrentPosition.bind(this);
        this.engine.onmessage = this.OnEngineMessage
    }

    uciCmd(cmd, which) {
        if (typeof cmd === "object") {
            // console.log("UCI: <adding book>")
        } else {
            // console.log("UCI: " + cmd)
        }
        
        (which || this.engine).postMessage(cmd);
    }

    displayStatus() {
        var status = 'Engine: ';
        if(!this.engineStatus.engineLoaded) {
            status += 'loading...';
        } else if(!this.engineStatus.engineReady) {
            status += 'loaded...';
        } else {
            status += 'ready.';
        }
        status += ' Book: ' + this.engineStatus.book;
        if(this.engineStatus.search) {
            status += '<br>' + this.engineStatus.search;
            if(this.engineStatus.score && this.displayScore) {
                status += (this.engineStatus.score.substr(0, 4) === "Mate" ? " " : ' Score: ') + this.engineStatus.score;
            }
        }
        // console.log(status);
    }

    get_moves()
    {
        var moves = '';
        var history = this.game.history({verbose: true});
        
        for(var i = 0; i < history.length; ++i) {
            var move = history[i];
            moves += ' ' + move.from + move.to + (move.promotion ? move.promotion : '');
        }
        
        return moves;
    }

    prepareMove() {
        // stopClock();
        // $('#pgn').text(game.pgn());
        // board.position(game.fen());
        // updateClock();
        var turn = this.game.turn();
        if(!this.game.isGameOver()) {
            if(turn != this.player) {
                this.uciCmd('position startpos moves' + this.get_moves());
                //uciCmd('eval');
                // this.uciCmd('position startpos moves' + this.get_moves(), evaler);
                // evaluation_el.textContent = "";
                //this.uciCmd("eval", evaler);
                
                this.uciCmd("go " + (this.time.depth ? "depth " + this.time.depth : "") + " wtime " + this.time.wtime + " winc " + this.time.winc + " btime " + this.time.btime + " binc " + this.time.binc);
                this.isEngineRunning = true;
            }
            if(this.game.history().length >= 2 && !this.time.depth && !this.time.nodes) {
                // startClock();
            }
        }
    }

    OnEngineMessage (event) {
        var line = event.data;
        console.log("Reply: " + line)
        if(line == 'uciok') {
            this.engineStatus.engineLoaded = true;
        } else if(line == 'readyok') {
            this.engineStatus.engineReady = true;
        } else {
            var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbk])?/);
            /// Did the AI move?
            if(match) {
                debugger
                this.isEngineRunning = false;
                this.game.move({from: match[1], to: match[2], promotion: match[3]});
                this.prepareMove();
                //uciCmd("eval")
                // evaluation_el.textContent = "";
                // uciCmd("eval", evaler);
            /// Is it sending feedback?
            } else if(match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/)) {
                this.engineStatus.search = 'Depth: ' + match[1] + ' Nps: ' + match[2];
            }
            
            /// Is it sending feed back with a score?
            if(match = line.match(/^info .*\bscore (\w+) (-?\d+)/)) {
                var score = parseInt(match[2]) * (this.game.turn() == 'w' ? 1 : -1);
                /// Is it measuring in centipawns?
                if(match[1] == 'cp') {
                    this.engineStatus.score = (score / 100.0).toFixed(2);
                /// Did it find a mate?
                } else if(match[1] == 'mate') {
                    this.engineStatus.score = 'Mate in ' + Math.abs(score);
                }
                
                /// Is the score bounded?
                if(match = line.match(/\b(upper|lower)bound\b/)) {
                    this.engineStatus.score = ((match[1] == 'upper') == (this.game.turn() == 'w') ? '<= ' : '>= ') + this.engineStatus.score
                }
            }
        }
        this.displayStatus();
    };

    onDrop (source, target) {
        // see if the move is legal
        try {
            if (this.game.turn() == this.player) {
                const move = this.game.move({
                    from: source,
                    to: target,
                    promotion: "q", // always promote to a queen for example simplicity
                  });
            
                  // illegal move
                  if (move === null) return 'snapback';
                  this.prepareMove();
            }
          } catch (err) {
            // console.log(err.message);
          }

        
    };

    GetCurrentPosition () {
        return this.game.fen();
    }

}