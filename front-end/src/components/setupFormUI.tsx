"use client";
import * as THREE from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";

export const setupFormUI = (model: THREE.Group, scene: THREE.Scene) => {
  model.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      const mesh = obj as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (mesh.material) {
        if (mesh.name === "Plane001_2") {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: 0x5a3e36,
            roughness: 0.15,
            metalness: 0.4,
            envMapIntensity: 0.8,
          });
        } else if (mesh.name === "Cube" || mesh.name === "Cube004") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x310a5d,
            roughness: 0.9,
            metalness: 0,
            envMapIntensity: 0.05,
          });
        } else if (["Text001", "Text002", "Text003"].includes(mesh.name)) {
          mesh.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
          });
        } else if (mesh.name === "Text") {
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x310a5d,
            roughness: 0.9,
            metalness: 0,
            envMapIntensity: 0.05,
          });
        }

        // Cube001, Cube002 => Name, Email
        if (mesh.name === "Cube001" || mesh.name === "Cube002") {
          const input = document.createElement("input");
          input.placeholder =
            mesh.name === "Cube001" ? "Your Name..." : "Your Email...";
          input.type = mesh.name === "Cube002" ? "email" : "text";

          input.style.width = "550px";
          input.style.height = "52px";
          input.style.fontSize = "22px";
          input.style.backgroundColor = "white";
          input.style.color = "black";
          input.style.border = "none";
          input.style.outline = "none";
          input.style.borderRadius = "8px";
          input.style.boxSizing = "border-box";
          input.style.pointerEvents = "auto";
          input.style.direction = "ltr";
          input.style.left = "0px";

          const cssObj = new CSS3DObject(input);
          mesh.updateMatrixWorld(true);
          const worldPos = new THREE.Vector3();
          const worldQuat = new THREE.Quaternion();
          mesh.getWorldPosition(worldPos);
          mesh.getWorldQuaternion(worldQuat);

          cssObj.position.copy(worldPos);
          cssObj.quaternion.copy(worldQuat);
          cssObj.scale.set(0.003, 0.0032, 0.0035);
          cssObj.position.z += 0.05;

          scene.add(cssObj);
          mesh.visible = false;
        }

        // Cube003 => Message
        if (mesh.name === "Cube003") {
          const textarea = document.createElement("textarea");
          textarea.placeholder = "Your Message...";

          textarea.style.width = "550px";
          textarea.style.height = "110px";
          textarea.style.fontSize = "22px";
          textarea.style.backgroundColor = "white";
          textarea.style.color = "black";
          textarea.style.border = "none";
          textarea.style.outline = "none";
          textarea.style.borderRadius = "8px";
          textarea.style.boxSizing = "border-box";
          textarea.style.pointerEvents = "auto";
          textarea.style.direction = "ltr";
          textarea.style.resize = "none";
          textarea.style.left = "0px";

          const cssObj = new CSS3DObject(textarea);
          mesh.updateMatrixWorld(true);
          const worldPos = new THREE.Vector3();
          const worldQuat = new THREE.Quaternion();
          mesh.getWorldPosition(worldPos);
          mesh.getWorldQuaternion(worldQuat);

          cssObj.position.copy(worldPos);
          cssObj.quaternion.copy(worldQuat);
          cssObj.scale.set(0.003, 0.0032, 0.0035);
          cssObj.position.y -= 0.1;
          cssObj.position.z += 0.05;

          scene.add(cssObj);
          mesh.visible = false;
        }

        // Cube004 => Send Button
        if (mesh.name === "Cube004") {
          const button = document.createElement("button");
          button.innerText = "Send";

          Object.assign(button.style, {
            width: "220px",
            height: "65px",
            fontSize: "32px",
            fontFamily: "var(--font-roboto), sans-serif",
            backgroundColor: "#563291",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            left: "0px",
          });

          button.onclick = () => {
            const nameInput = document.querySelector(
              'input[placeholder="Your Name..."]'
            ) as HTMLInputElement;
            alert(`Sent! Thanks ${nameInput?.value || ""}`);
          };

          const cssObj = new CSS3DObject(button);
          mesh.updateMatrixWorld(true);
          const worldPos = new THREE.Vector3();
          const worldQuat = new THREE.Quaternion();
          mesh.getWorldPosition(worldPos);
          mesh.getWorldQuaternion(worldQuat);

          cssObj.position.copy(worldPos);
          cssObj.quaternion.copy(worldQuat);
          cssObj.scale.set(0.003, 0.0032, 0.0035);
          cssObj.position.z += 0.05;

          scene.add(cssObj);
          mesh.visible = false;
        }
      }
    }
  });
};
