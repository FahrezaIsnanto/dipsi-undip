import React, { useEffect } from 'react'
import Footer from './footer'
import {
    title,
    content,
    videoFirst,
    qrVideo,
    detectedLinkAbsen,
    afterDetectedButton,
    absenButton,
    copyButton,
    infoAll,
    buttonArea,
    startButton,
    stopButton,
} from './mainApp.module.css'

import QrScanner from 'qr-scanner';

const MainApp = () => {
    var video,camHasCamera,camQrResult,videoZoom,afterDetect,scanner;

    useEffect(()=>{
        QrScanner.WORKER_PATH = "/qr-scanner/qr-scanner-worker.min.js";
        video =  document.getElementById('qr-video');
        camHasCamera = document.getElementById('cam-has-camera');
        camQrResult = document.getElementById('cam-qr-result');
        videoZoom = document.getElementById('video-first');
        afterDetect = document.getElementById('after-detected-button');
        
        QrScanner
        .hasCamera()
        .then(hasCamera=> camHasCamera.textContent = " Tersedia")
        .catch(err => camHasCamera.textContent = " Tidak Tersedia");

        scanner = new QrScanner(
            video,
            result => setResult(camQrResult,result),
            error => {
                camQrResult.textContent = 'Link tidak terdetect';
                camQrResult.style.color = 'inherit';
            }
            )

    },[]);

    const setResult = (label,result) =>{
        if(result){
            label.textContent = "https://siap.undip.ac.id/a/"+result;
            label.style.color ='lightgreen';
            scanner.stop();
            afterDetect.style.display='block'
        }
    }

    const modeFunc = (event) => {
        scanner.setInversionMode(event.target.value);
    }

    const startFunc = () => {
        scanner.start();
        videoZoom.appendChild(scanner.$canvas);
        scanner.$canvas.style.display = 'block';
        scanner.$canvas.style.width = 280;
    }

    const stopFunc = () => {
        scanner.stop();
        scanner.$canvas.style.display = 'none';
        camQrResult.textContent="Kosong";
        afterDetect.style.display='none';
    }

    const copyFunc = () => {
        if(camQrResult.textContent!=''){
            var copyText = camQrResult.textContent;
            var textArea = document.createElement('textarea');
            textArea.value = copyText;
            document.body.appendChild(textArea);
            textArea.select();
            textArea.setSelectionRange(0, 99999);
            document.execCommand('copy');
            textArea.remove();
        }
    }

    const absenFunc = () => {
        if(camQrResult.textContent!=''){
            document.location=camQrResult.textContent;
        }
    }

    return (
        <>
        <div className={title}>
            <h1>DIPSI</h1>
            <p>Aplikasi Deteksi Link Presensi UNDIP</p>
        </div>
        <div className={content}>
            <div id="video-first" className={videoFirst}>
                <video id="qr-video" className={qrVideo}></video>
            </div>
            <div className={detectedLinkAbsen}>
                <span>Link absen :</span>
                <span id='cam-qr-result'>Kosong</span>
            </div>
            <div id="after-detected-button" className={afterDetectedButton}>
                <button id="absen-button" className={absenButton} onClick={absenFunc}>Absen</button>
                <button id="copy-button" className={copyButton} onClick={copyFunc}>Copy</button>
            </div>
            <div className={infoAll}>
                <p>Info</p>
                <hr/>
                <span>Device Kamera:</span>
                <span id="cam-has-camera"></span>
                <br/>
                <select id="inversion-mode-select" onChange={modeFunc}>
                    <option value="">Pilih mode scan</option>
                    <option value="original">Original (kode QR gelap dengan latar belakang cerah)</option>
                    <option value="invert">Pindai dengan warna terbalik (kode QR cerah dengan latar belakang gelap)</option>
                    <option value="both">Scan Keduanya</option>
                </select>
            </div>
            <div className={buttonArea}>
                <button id="start-button" className={startButton} onClick={startFunc}>Mulai</button>
                <button id="stop-button" className={stopButton} onClick={stopFunc}>Berhenti</button>
            </div>
            <Footer/>
        </div>
        </>
    )
}

export default MainApp
