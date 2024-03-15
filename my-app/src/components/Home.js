import React from 'react';

function Home() {
    return (
        <section className="warehouse">
            <div className="container">
                <h2>Aktualny stan magazynowy</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Nazwa produktu</th>
                        <th>Ilość w szt/mb</th>
                        <th>m3</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Home;