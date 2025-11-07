'use client';

import { useEffect, useRef, useState } from 'react';
import * as BABYLON from '@babylonjs/core';
import styles from './ColorMatchGame.module.css';

interface ColorMatchGameProps {
  onGameEnd: (score: number) => void;
}

export default function ColorMatchGame({ onGameEnd }: ColorMatchGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetColor, setTargetColor] = useState('');
  const gameDataRef = useRef({
    engine: null as BABYLON.Engine | null,
    scene: null as BABYLON.Scene | null,
    spheres: [] as BABYLON.Mesh[],
    colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
    currentTarget: '',
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);
    gameDataRef.current.engine = engine;

    const createScene = () => {
      const scene = new BABYLON.Scene(engine);
      scene.clearColor = new BABYLON.Color4(0.1, 0.1, 0.2, 1);
      gameDataRef.current.scene = scene;

      // Camera
      const camera = new BABYLON.ArcRotateCamera(
        'camera',
        Math.PI / 2,
        Math.PI / 3,
        15,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);
      camera.lowerRadiusLimit = 10;
      camera.upperRadiusLimit = 20;

      // Light
      const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0),
        scene
      );
      light.intensity = 0.8;

      // Create colored spheres
      const colorMap: { [key: string]: BABYLON.Color3 } = {
        red: new BABYLON.Color3(1, 0, 0),
        blue: new BABYLON.Color3(0, 0, 1),
        green: new BABYLON.Color3(0, 1, 0),
        yellow: new BABYLON.Color3(1, 1, 0),
        purple: new BABYLON.Color3(0.5, 0, 0.5),
        orange: new BABYLON.Color3(1, 0.5, 0),
      };

      const spheres: BABYLON.Mesh[] = [];
      gameDataRef.current.colors.forEach((color, index) => {
        const sphere = BABYLON.MeshBuilder.CreateSphere(
          `sphere-${color}`,
          { diameter: 2 },
          scene
        );

        // Arrange in a circle
        const angle = (index / gameDataRef.current.colors.length) * Math.PI * 2;
        sphere.position = new BABYLON.Vector3(
          Math.cos(angle) * 5,
          0,
          Math.sin(angle) * 5
        );

        const material = new BABYLON.StandardMaterial(`mat-${color}`, scene);
        material.diffuseColor = colorMap[color];
        material.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        sphere.material = material;
        sphere.metadata = { color };

        // Add hover effect
        sphere.actionManager = new BABYLON.ActionManager(scene);
        sphere.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOverTrigger,
            () => {
              sphere.scaling = new BABYLON.Vector3(1.2, 1.2, 1.2);
            }
          )
        );
        sphere.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            () => {
              sphere.scaling = new BABYLON.Vector3(1, 1, 1);
            }
          )
        );
        sphere.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            () => {
              handleSphereClick(color);
            }
          )
        );

        spheres.push(sphere);
      });

      gameDataRef.current.spheres = spheres;

      return scene;
    };

    const scene = createScene();

    // Set initial target
    const randomColor =
      gameDataRef.current.colors[
        Math.floor(Math.random() * gameDataRef.current.colors.length)
      ];
    gameDataRef.current.currentTarget = randomColor;
    setTargetColor(randomColor);

    engine.runRenderLoop(() => {
      scene.render();
    });

    const handleResize = () => {
      engine.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.dispose();
      engine.dispose();
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      onGameEnd(score);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, score, onGameEnd]);

  const handleSphereClick = (color: string) => {
    if (color === gameDataRef.current.currentTarget) {
      // Correct!
      setScore((prev) => prev + 100);

      // Animate correct sphere
      const sphere = gameDataRef.current.spheres.find(
        (s) => s.metadata.color === color
      );
      if (sphere) {
        BABYLON.Animation.CreateAndStartAnimation(
          'pulse',
          sphere,
          'scaling',
          30,
          15,
          sphere.scaling,
          new BABYLON.Vector3(1.5, 1.5, 1.5),
          BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        setTimeout(() => {
          BABYLON.Animation.CreateAndStartAnimation(
            'unpulse',
            sphere,
            'scaling',
            30,
            15,
            sphere.scaling,
            new BABYLON.Vector3(1, 1, 1),
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
          );
        }, 200);
      }

      // Set new target
      const randomColor =
        gameDataRef.current.colors[
          Math.floor(Math.random() * gameDataRef.current.colors.length)
        ];
      gameDataRef.current.currentTarget = randomColor;
      setTargetColor(randomColor);
    } else {
      // Wrong!
      setScore((prev) => Math.max(0, prev - 50));
    }
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.hud}>
        <div className={styles.stat}>
          <span>Score:</span>
          <strong>{score}</strong>
        </div>
        <div className={styles.stat}>
          <span>Time:</span>
          <strong>{timeLeft}s</strong>
        </div>
        <div className={styles.target}>
          Click the <strong style={{ color: targetColor, textTransform: 'uppercase' }}>{targetColor}</strong> sphere!
        </div>
      </div>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
