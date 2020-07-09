import React from 'react'
import { Row, Col, Avatar, Button, Divider } from 'antd'

const Abonnment =()=>{
    return(
        <div>
            <Row>
                    <Col span={24} style={{background:"beige"}} >
                        <div style={{background:"",padding:'22px 13px',fontSize:32,fontFamily: "serif"}}>
                            <h1>
                                <center>
                                    <b>
                                        Lisez sans limites
                                    </b>
                                </center>
                            </h1>
                            
                        </div>
                        <div style={{padding:'10px 5px',fontSize:22,fontFamily: "serif"}}>
                                <center>
                                    Profitez d'un nombre illimité* de livres, et bien plus.
                                </center>
                        
                        </div>
                        <div style={{padding:'22px 18px',fontSize:32,fontFamily: "serif" , }}>
                            <center>
                                <Button style={{height:"auto"}} >
                                    <div style={{fontSize:22 }}>
                                        Lisez Gratuitement Pendant 30 Jours
                                    </div>
                                    
                                </Button>
                            </center>
                                
                        </div>
                        <div style={{height:80}}></div>
                    </Col>
                    <Divider/>
                    <Col span={24}   style={{background:"red"}}>
                        <div style={{background:"",padding:'22px 13px',fontSize:32,fontFamily: "serif"}}>
                            <h1>
                                <center>
                                    <b>
                                        Restez curieux
                                    </b>
                                </center>
                            </h1>
                            
                        </div>
                        <div style={{padding:'10px 5px',fontSize:22,fontFamily: "serif"}}>
                                <center>
                                    Il y a toujours quelque chose de nouveau à découvrir.
                                </center>
                        
                        </div>

                        <div style={{height:80}}></div>
                    </Col>
                    <Divider/>
                    <Col span={24}   style={{background:"yellow"}}>
                        <div style={{background:"",padding:'22px 13px',fontSize:32,fontFamily: "serif"}}>
                            <h1>
                                <center>
                                    <b>
                                        Détails de l'abonnement
                                    </b>
                                </center>
                            </h1>
                        </div>
                        <div style={{padding:'22px 13px',fontSize:22,fontFamily: "serif"}}>
                            <center>
                                Accès en illimité* à la lecture de livres et bien plus — à partir de  40DH/mois
                            </center>
                        
                        </div>
                        <div>
                            <Row gutter={[24,24]} >
                                <Col offset={4} span={8}>
                                    <center>
                                        <Avatar size={100} src="https://cdn.onlinewebfonts.com/svg/img_293228.png"   />
                                    </center>
                                    <center style={{fontSize:24,fontFamily: "serif"}}>
                                        <b>
                                        Enfant
                                        </b>
                                    </center>
                                    <center style={{fontSize:18,fontFamily: "serif"}}>
                                        amusez-vous à tout moment des livres des enfants
                                    </center>
                                </Col>
                                <Col span={8}>
                                    <center>
                                        <Avatar size={100} src="https://cdn4.iconfinder.com/data/icons/greek-latin-symbols-solid-1/24/omega-512.png" />
                                    </center>
                                    <center style={{fontSize:24,fontFamily: "serif"}}>
                                        <b>
                                        Ultimate
                                        </b>
                                    </center>
                                    <center style={{fontSize:18,fontFamily: "serif"}}>
                                        Profitez d'un nombre illimité* de livres
                                    </center>
                                </Col>
                            </Row>
                            <div style={{padding:'22px 18px',fontSize:32,fontFamily: "serif" , }}>
                                <center>
                                    <Button style={{height:"auto"}} >
                                        <div style={{fontSize:22 }}>
                                            Lisez Gratuitement Pendant 30 Jours
                                        </div>
                                        
                                    </Button>
                                </center>
                                
                            </div>
                        </div>
                        <div style={{height:80}}></div>
                    </Col>
                
                
            </Row>
        </div>
    )
}

export default Abonnment