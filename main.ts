namespace SpriteKind {
    export const Immune = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    bullet = sprites.createProjectileFromSprite(assets.image`bullet`, tank, 0, -100)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.none, 100)
    info.changeLifeBy(1)
    pause(1000)
})
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverScoringType(game.ScoringType.HighScore)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.none, 100)
    sprites.destroy(sprite, effects.none, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.coolRadial, 100)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    tank.setKind(SpriteKind.Immune)
    pause(1000)
    tank.startEffect(effects.halo, 1000)
    tank.setKind(SpriteKind.Player)
})
let live: Sprite = null
let bomb: Sprite = null
let bullet: Sprite = null
let tank: Sprite = null
scene.setBackgroundImage(assets.image`landscape`)
tank = sprites.create(assets.image`player`, SpriteKind.Player)
tank.setPosition(80, 110)
controller.moveSprite(tank, 100, 100)
let gravity = 50
info.setLife(3)
game.splash("\"Oh, no, they're coming!\"")
tank.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    bomb = sprites.create(img`
        .cccccccccccccc.
        cbddddddddddddbc
        cddddddddddddddc
        cddddddddddddddc
        cddddddddddddddc
        cddddddddddddddc
        cddddddddddddddc
        cddddddddddddddc
        cdbbbbbbbbbbbbdc
        cbbbbbbbbbbbbbbc
        cbddddddddddddbc
        cbcbbbcbbcbbbcbc
        fbcbbbcddcbbbcbf
        fbcbbbbccbbbbcbf
        fbccccccccccccbf
        fbbbbbbbbbbbbbbf
        fbddddddddddddbf
        fbcbbbcbbcbbbcbf
        fbcbbbcddcbbbcbf
        fbcbbbbccbbbbcbf
        fbccccccccccccbf
        fbbbbbbbbbbbbbbf
        fbffffffffffffbf
        ffffffffffffffff
        `, SpriteKind.Enemy)
    bomb.setFlag(SpriteFlag.AutoDestroy, true)
    bomb.setPosition(randint(0, 100), 0)
    bomb.setVelocity(0, gravity)
})
game.onUpdateInterval(8000, function () {
    live = sprites.create(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        .......22...22......
        ......2322.2222.....
        ......232222222.....
        ......222222222.....
        .......22222b2......
        ........222b2.......
        .........222........
        ..........2.........
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        `, SpriteKind.Food)
    live.setFlag(SpriteFlag.AutoDestroy, true)
    live.setPosition(randint(0, 100), 0)
    live.setVelocity(0, 100)
})
