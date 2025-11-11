import { useEffect, useState } from 'react';

type GyroPermissionState = 'granted' | 'denied' | 'prompt';

export default function App() {
    const [ip, setIp] = useState<string>('N/A');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [gyroPermission, setGyroPermission] = useState<GyroPermissionState>('prompt');
    const [alpha, setAlpha] = useState<number | null>(null);
    const [beta, setBeta] = useState<number | null>(null);
    const [gamma, setGamma] = useState<number | null>(null);

    const [heading, setHeading] = useState<number | null>(null);
    const [compassAccuracy, setCompassAccuracy] = useState<number | null>(null);
    const [absolute, setAbsolute] = useState<boolean>(false);

    const [accelX, setAccelX] = useState<number | null>(null);
    const [accelY, setAccelY] = useState<number | null>(null);
    const [accelZ, setAccelZ] = useState<number | null>(null);
    const [accelInterval, setAccelInterval] = useState<number | null>(null);
    const [accelPermission, setAccelPermission] = useState<GyroPermissionState>('prompt');

    useEffect(() => {
        const onIp = (e: Event) => {
            const { loading, ip, error } = (e as CustomEvent).detail ?? {};
            setLoading(Boolean(loading));
            setIp(ip ?? 'N/A');
            setError(error?.message ?? null);
        };
        const onGyroPerm = (e: Event) => {
            const { state } = (e as CustomEvent).detail ?? {};
            setGyroPermission(state);
        };
        const onGyro = (e: Event) => {
            const { alpha, beta, gamma } = (e as CustomEvent).detail ?? {};
            setAlpha(alpha ?? null);
            setBeta(beta ?? null);
            setGamma(gamma ?? null);
        };
        const onCompass = (e: Event) => {
            const { heading, accuracy, absolute } = (e as CustomEvent).detail ?? {};
            setHeading(typeof heading === 'number' ? heading : null);
            setCompassAccuracy(typeof accuracy === 'number' ? accuracy : null);
            setAbsolute(Boolean(absolute));
        };
        const onAccelPerm = (e: Event) => {
            const { state } = (e as CustomEvent).detail ?? {};
            setAccelPermission(state);
        };
        const onAccel = (e: Event) => {
            const { acceleration, interval } = (e as CustomEvent).detail ?? {};
            setAccelX(acceleration?.x ?? null);
            setAccelY(acceleration?.y ?? null);
            setAccelZ(acceleration?.z ?? null);
            setAccelInterval(typeof interval === 'number' ? interval : null);
        };

        window.addEventListener('ipStateChange', onIp as EventListener);
        window.addEventListener('gyroPermissionState', onGyroPerm as EventListener);
        window.addEventListener('gyroStateChange', onGyro as EventListener);
        window.addEventListener('compassStateChange', onCompass as EventListener);
        window.addEventListener('accelPermissionState', onAccelPerm as EventListener);
        window.addEventListener('accelStateChange', onAccel as EventListener);
        return () => {
            window.removeEventListener('ipStateChange', onIp as EventListener);
            window.removeEventListener('gyroPermissionState', onGyroPerm as EventListener);
            window.removeEventListener('gyroStateChange', onGyro as EventListener);
            window.removeEventListener('compassStateChange', onCompass as EventListener);
            window.removeEventListener('accelPermissionState', onAccelPerm as EventListener);
            window.removeEventListener('accelStateChange', onAccel as EventListener);
        };
    }, []);

    const requestPermission = () => {
        window.dispatchEvent(new Event('requestGyroPermission'));
    };

    return (
        <div style={{ padding: 16, fontFamily: 'system-ui, sans-serif' }}>
            <h1>SDK Demo (React + Vite)</h1>

            <section>
                <h2>IP Address from event</h2>
                <p>
                    IP: <strong>{ip}</strong>
                </p>
                <p>
                    Loading: <strong>{loading ? 'Loading...' : 'Finished'}</strong>
                </p>
                <p>
                    Error: <strong>{error ?? 'No error'}</strong>
                </p>
            </section>

            <section>
                <h2>Gyroscope</h2>
                <p>
                    Permission: <strong id="gyro-permission">{gyroPermission}</strong>
                </p>
                <p>
                    alpha (z): <strong id="gyro-alpha">{typeof alpha === 'number' ? alpha.toFixed(1) : '-'}</strong>
                </p>
                <p>
                    beta (x): <strong id="gyro-beta">{typeof beta === 'number' ? beta.toFixed(1) : '-'}</strong>
                </p>
                <p>
                    gamma (y): <strong id="gyro-gamma">{typeof gamma === 'number' ? gamma.toFixed(1) : '-'}</strong>
                </p>
                <button id="request-gyro" onClick={requestPermission}>
                    Request Gyro Permission
                </button>
            </section>

            <section>
                <h2>Compass</h2>
                <p>
                    heading (°): <strong id="compass-heading">{typeof heading === 'number' ? heading.toFixed(1) : '-'}</strong>
                </p>
                <p>
                    accuracy (°):{' '}
                    <strong id="compass-accuracy">{typeof compassAccuracy === 'number' ? compassAccuracy.toFixed(1) : '-'}</strong>
                </p>
                <p>
                    absolute: <strong id="compass-absolute">{absolute ? 'true' : 'false'}</strong>
                </p>
            </section>

            <section>
                <h2>Accelerometer</h2>
                <p>
                    Permission: <strong id="accel-permission">{accelPermission}</strong>
                </p>
                <p>
                    accel x: <strong id="accel-x">{typeof accelX === 'number' ? accelX.toFixed(1) : '-'}</strong>
                </p>
                <p>
                    accel y: <strong id="accel-y">{typeof accelY === 'number' ? accelY.toFixed(1) : '-'}</strong>
                </p>
                <p>
                    accel z: <strong id="accel-z">{typeof accelZ === 'number' ? accelZ.toFixed(1) : '-'}</strong>
                </p>
                <p>
                    interval (ms): <strong id="accel-interval">{typeof accelInterval === 'number' ? accelInterval.toFixed(1) : '-'}</strong>
                </p>
            </section>
        </div>
    );
}
